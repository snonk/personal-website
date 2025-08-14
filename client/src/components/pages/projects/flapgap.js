import React, { useEffect } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

import "../../../utilities.css";
import "./projpage.css";


const FlapGap = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
        }, []);
    return (
        <div className="projBody">
        <h1 className="projTitle">Flap Through the Gap</h1>
        <h2 className="projSubtitle">Fall 2024</h2>
        <p>
        Flap through the Gap is a game programmed on an FPGA for MIT's 6.205 (Digital Systems Lab) by me, andrewl2, and maggislo. The game is a first-person flight simulator, where the player navigates through a tunnel containing a series of walls with holes.
        <div className="captionedPhoto smallPhoto">
        <img src="/projects/flapgap/game_mockup.png"/>
        <p>
        The idea.
        </p>
        </div>
        The objective is simply to fly through as many of these obstacles as possible without colliding with the walls. The player controls movement with a physical controller, which uses a gyroscope and an accelerometer sensor to detect tilting for directional control. The game is rendered from the perspective of the player with a rasterization engine optimized to handle the specific layout of the game. The output of the graphics engine is then displayed on an external monitor via HDMI.
        </p>
        <div className="captionedPhoto">
        <img src="/projects/flapgap/block_diagram.png"/>
        <p>
        Block diagram detailing the design of the system.
        </p>
        </div>

        <p>
            The rest of this post will go through some of the more technical details, including the design of the system, some of the shortcuts we took on the graphics engine, and the complexities of doing math on an FPGA.
        </p>
        <h3>Calculations</h3>
        <p>
            Flap Through the Gap works exclusively with integers. This results in some interesting ways to avoid floating-point math.
        <br/><br/>
            First, when multiplying integers by fractional values, we multiply by the numerator and then shift to divide by the denominator.
        <br/><br/>
        <MathJax>
            {"Many parts of our system also require the use of trigonometric functions. This includes arctangent in the gyroscope/accelerometer input handler's calculations, and sine and cosine when handling rotations and perspective transformations in the game logic and the rasterization engine. To approximate these functions, we compute the values in advance using a Python script and store them in lookup tables stored in BRAM. For example, our sine lookup table has a depth of 256 and a width of 8 bits, and the $i$th index stores $256 \\cdot \\sin(\\frac{i}{256} \\cdot \\frac{\\pi}{2})$. When using a value retrieved from this BRAM, we eventually shift the result by 8 bits to scale it back to the original range."}
        </MathJax>
        <br/>
        Many of the complex calculations throughout the system are implemented combinationally. However, these calculations cannot be completed within a single clock cycle. Instead of pipelining these computations, we empirically determine an upper bound for the number of cycles required for the combinational logic to stabilize. Only after we wait the computed number of cycles do we pass the results to the next stage.
        </p>

        <h3>Peripheral Hardware</h3>
        <p>
Player movement is determined by a controller with an MPU-9250 sensor attached. The sensor records gyroscope and accelerometer data, which are combined to calculate the player's perspective and acceleration in the game logic module.
</p>
<div className="captionedPhoto smallPhoto">
        <img src="/projects/flapgap/controller_design.png"/>
        <p>Controller as designed in SolidWorks</p>
        </div>
<p>

To interface with the MPU-9250, our system uses an SPI module. To initiate a read operation, the SPI controller transmits the relevant register address. The MPU-9250 then responds with the respective register data, read linearly starting at the given address. Each measurement register contains 16 bits, however, because our system does not require the high sensitivity provided by all 16 bits, we utilize only the first byte of data. Therefore, our SPI controller writes 8 bits of the register address and then reads 8 bits of measurement data.
</p>
<div className="captionedPhoto smallPhoto">
        <img src="/projects/flapgap/spi.png"/>
        <p>Format of SPI communications with the MPU-9250</p>
        </div>
<p>
The SPI controller iterates through all of the sensor's output registers and constructs the accelerometer and gyroscope measurements for each axis. These measurements are then forwarded to the input handler module where they are used to calculate the output roll, pitch, and yaw. 

It has been found that the raw accelerometer data read from the sensor often exhibits high-frequency noise, while the gyroscope data contains low-frequency noise. To reduce the noise in the input measurements, the input handler module implements a complementary filter to merge accelerometer and gyroscope signals:
<br/><br/>

<MathJaxContext>
        <MathJax>
{"\\begin{align*}\\theta_y[n] = & \\ \\beta \\left( \\theta_y[n-1] + T g_y[n-1] \\right) + \\\\ & \\ (1 - \\beta) \\tan^{-1} \\left( \\frac{a_z[n-1]}{a_x[n-1]} \\right)\\end{align*}"}
        </MathJax>
        </MathJaxContext>
<br/>
    <MathJax>
    {"where $\\beta$ is the filter coefficient, $T$ is one time step, $g_y$ is a measurement of the gyroscope in the $y$-axis, and $a_x, a_z$ are accelerometer measurements in \\( x \\)- and \\( z \\)-axes respectively.  Doing so, we are able to better model the player's direction of movement."}
    </MathJax>

In order to perform these calculations, we used a divider module to divide accelerometer measurements, and look up arctangent values in BRAM, as stated previously. The filter operates on each axis in parallel, and the output roll, pitch, and yaw from each respective instantiation are forwarded to the game logic module.
    </p>

        <h3>Game Logic</h3>

        <p>

Given roll, pitch, and yaw data from the gyroscope input handler, the game logic computes the new position and angle of the player. Additionally, the game logic only accepts input and begins computations only when the image writer has finished writing the results from the previous calculations to the double frame buffer. To smooth out sudden changes in angle, we compute a weighted sum of the current angle and the new angle. The direction of movement is determined using values derived from the rotation matrix (described later). Then, the game logic adds the product of the speed and this unit vector to the current position. Positions are stored as 16-bit fixed point values, where the top 8 bits represent the integer game units and the bottom 8 bits represent the fractional part. Only the top 8 bits will be sent to the rasterization engine, and the fractional parts are only used to achieve more accurate movement.
<br/><br/>
Detection of collisions is relatively straightforward. The new position is checked to see whether it is within the tunnel boundaries. Additionally, it is checked that the player does not collide with the nearest wall. These checks are performed using simple inequalities.
<br/><br/>
The game logic maintains a set of the next five upcoming walls, each of which is described by a subset of the 64 blocks (32 by 32 by 32 game units) that fill a 256 by 256 by 32 game unit area. The walls are spaced by 256 game units and whenever the player's position advances 256 game units into the tunnel, a new wall is generated. Walls are randomly selected from a predefined set of configurations using randomness derived from the video signal generator.
        </p>

<h3>Rasterization Engine</h3>
<p>
To render the game's graphics, we implemented a version of the rasterization engine optimized for our specific input. The graphics pipeline is largely split into two sections: the rasterizer, and the image writer. The main functionality of the rasterizer is to break the game map down into its constituent triangles and compute their projection and color. Because the layout of the game's map is largely cubical, we were able to make some simplifications in some steps of the algorithm, which we will detail later. The output of this is then passed to the image writer, which identifies which pixels on the screen each triangle occupies and writes their color to an image buffer. Once a buffer is complete, it is then sent to an external monitor with HDMI.
<div className="captionedPhoto ">
<MathJaxContext>
        <MathJax>
{"\\[ R = \\begin{bmatrix} \\cos\\psi\\cos\\theta & \\cos\\psi\\sin\\theta\\sin\\phi - \\sin\\psi\\cos\\phi & \\cos\\psi\\sin\\theta\\cos\\phi + \\sin\\psi\\sin\\phi \\\\ \\sin\\psi\\cos\\theta & \\sin\\psi\\sin\\theta\\sin\\phi + \\cos\\psi\\cos\\phi & \\sin\\psi\\sin\\theta\\cos\\phi - \\cos\\psi\\sin\\phi \\\\ -\\sin\\theta & \\cos\\theta\\sin\\phi & \\cos\\theta\\cos\\phi \\end{bmatrix} \\]"}
        </MathJax>
        </MathJaxContext>
    <p>Rotation matrix for world-to-camera computation.</p>
</div>
<MathJax>
{"The rasterizer's first step is to generate the triangles that make up the game map. The game logic module passes a wall configuration to the rasterizer, consisting of a packed array of bits representing whether each cell in an $8\\times8$ wall grid contains a wall or a hole. Given this configuration, the rasterizer iterates through each cell in the wall, starting from the wall in farthest back. It splits each face of the $32\\times32\\times 32$ cube down a diagonal into two right triangles. The same is done for the walls of the tunnels, which are of roughly fixed position in the game world."}

</MathJax>
<br/><br/>
Typically, rasterization algorithms make use of a z-buffer to keep track of the depth of triangles in world space in order to determine which triangles are positioned in front of others, and therefore which colors to write to the final image. However, because the configuration of the walls in this game is very well-defined, we were able to optimize the rasterizer by removing the z-buffer. Instead, in order to guarantee that the correct triangles are written to the image buffer, our algorithm processes the triangles in a very specific ordering:
<ul>
<li>
    Tunnel walls are divided into six segments. Divisions are drawn where obstacle walls are placed. Each segment of the tunnel wall must be processed before the obstacle wall that it is behind.
</li>
    <li>Obstacle walls are processed from back to front, in between the tunnel segments that it divides.</li>
    <li>The non-forward-facing sides of <em>all blocks</em> in a singular obstacle wall are processed first.</li>
    <li>Then, the forward-facing sides of an obstacle wall are processed.</li>
</ul>

By generating and processing triangles in this order, we can guarantee that the triangles in the back are processed before any triangles that are positioned in front of them in world space. Therefore, the need for a z-buffer is removed. This is a huge optimization for memory usage &mdash; a z-buffer would have needed to use as much memory as our image buffer itself, which would have approximately doubled the memory usage for the rasterizer.
<br/><br/>
The rasterizer then computes the color for each of these triangles by computing the dot product between a global directional light vector and the normal vector of each triangle:
<MathJaxContext>
<MathJax>
{"\\[\\text{color}=\\mathbf{n_{triangle}}\\cdot \\mathbf{d}\\]"}
</MathJax>
</MathJaxContext>

The configuration of the game map again allowed for significant optimizations in the light calculation &mdash; because there are only five possible normals, instead of computing the normal of each triangle by taking the cross product of two vectors, we simply select the correct normal when generating the triangle itself.
<br/><br/>

Additionally, we add some fog, make further objects appear darker by darkening a triangle's color by a constant multiple of it's depth.
<br/><br/>

Finally, the rasterizer converts the coordinates of the triangles from world space into camera space based on the rotation and position of the player passed from the game logic module, and projects these triangles onto a 2D image plane.
<br/><br/>
<MathJax>
{"To convert the coordinates from world space to camera space, the rasterizer first translates the triangle's coordinates by the current player's position coordinates. Then, the rasterizer computes a rotation matrix from the roll, pitch, and yaw received from the game logic module by taking the product of the corresponding matrices, where roll is $\\phi$, pitch is $\\theta$, and yaw is $\\psi$."}
</MathJax>
<br/>

Combining this translation and rotation, we get the transformation:
<br/><br/>
<MathJaxContext>
<MathJax>
{"\\[\\begin{bmatrix}x\\\\y\\\\z \\end{bmatrix} \\rightarrow R \\begin{bmatrix}x - x_{\\text{pos}}\\\\y - y_{\\text{pos}}\\\\z - z_{\\text{pos}} \\end{bmatrix}\\]"}
</MathJax>
</MathJaxContext>
<br/>

<MathJax>

{"After transformation, the coordinates are projected down to the $xz$-plane by dividing both the $x$ and $z$ coordinates by $y$ and then multiplying by 320 and 180, respectively. In the case of a negative $y$ value, we approximate the result by having the division $\\frac{x}{y}$ return a large number with the same sign as $x$ and having the division $\\frac{z}{y}$ return a large number with the same sign as $z$. This just represents a point way off screen in the approximate direction of $(x,z)$. Lastly, we translate by (160, 90) to set (0,0) to be the bottom left of the screen."}
</MathJax>
<br/>

These computations require use of the integer division and trigonometric LUTs described earlier. After all computations for one triangle are complete, the triangle is forwarded to the image writer module.
</p>
<h3>Image Writer</h3>
<p>
The image writer takes the projected triangles that the rasterizer inputs into the system and determines the corresponding pixels to color in. To store the pixels, the module makes use of a double buffer. One buffer is used to store the pixels as they are being colored, and the other buffer is read by the HDMI module (and cleared in the process); once both buffers have completed their function, they swap functions. Additionally, before the image writer starts writing triangles to a buffer, it first goes through and clears the buffer so no remnants of the previous frame cause any artifacts.
<br/><br/>
<MathJax>
{"To determine the pixels that correspond to a triangle, the module first computes the bounding box for the triangle, then iterates through all the pixels within that box. For a triangle with coordinate vectors $\\mathbf{p_1},\\mathbf{p_2},\\text{ and } \\mathbf{p_3}$ and edges $\\mathbf{e_1},\\mathbf{e_2},\\text{ and } \\mathbf{e_3}$, A pixel $\\mathbf{p}$ is within the triangle if"}

</MathJax>
<MathJaxContext>
<MathJax>
{"\\[(\\mathbf{p}-\\mathbf{p_1})\\times \\mathbf{e_1} < 0\\]"}
</MathJax>
<MathJax>
{"\\[(\\mathbf{p}-\\mathbf{p_2})\\times \\mathbf{e_2} < 0\\]"}
</MathJax>
<MathJax>
{"\\[(\\mathbf{p}-\\mathbf{p_3})\\times \\mathbf{e_3} < 0\\]"}
</MathJax>
</MathJaxContext>

The color from the rasterizer is written to the pixel if it is determined to be within the triangle. 
<br/><br/>
Combine all these parts and a lot of debugging and simulation, and you get the final game!
</p>
<div className="captionedPhoto">
        <img src="/projects/flapgap/flap.gif"/>
        <p>
        The final working (mostly) game!
        </p>
        </div>

<h3>Conclusion</h3>
<p>All together, this project was a lot of fun but a lot of pain to debug. We submitted this project (which we had the majority of the semester to complete) pretty much one minute before the deadline, and only got the graphics engine to look even remotely reasonable in the afternoon of the last day. None of us had any experience programming FPGAs prior to this class, and learned a lot from coming up with the design and carrying it out. We learned to never trust simulation and that none of us knew linear algebra.</p>
    </div>
    )
}

export default FlapGap;