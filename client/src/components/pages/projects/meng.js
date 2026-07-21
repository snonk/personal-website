import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import julia from 'react-syntax-highlighter/dist/esm/languages/hljs/julia';
import mlirLanguage from 'highlightjs-mlir';

// dracula provides a beautiful pink, purple, and blue palette
import { atelierForestLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('julia', julia);
SyntaxHighlighter.registerLanguage('mlir', mlirLanguage);


import "../../../utilities.css";
import "./projpage.css";

function JuliaCodeBlock() {
    // Sample Julia code (a function calculating the Fibonacci sequence)
    const juliaCode = `function newton_schulz_muon(G; steps=12, eps=1e-A)
    T = eltype(G)
    a, b, c = (T(3.4445), T(-4.7750), T(2.0315))

    # Normalize
    X = G
    X = X ./ (norm(X) + T(eps))

    if size(G, 1) > size(G, 2)
        X = X'
    end

    @trace for _ in 1:steps
        A = X * X'
        B = b .* A .+ c .* (A * A)
        X = a .* X .+ B * X
    end

    if size(G, 1) > size(G, 2)
        X = X'
    end

    return X
end`;

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto' }}>
            <SyntaxHighlighter
                language="julia"
                style={atelierForestLight}
                showLineNumbers={true}
                wrapLongLines={true}
                customStyle={{
                    borderRadius: '12px',
                    padding: '20px',
                    fontSize: '14px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                {juliaCode}
            </SyntaxHighlighter>
        </div>
    );
}

function MLIR() {
    // Sample Julia code (a function calculating the Fibonacci sequence)
    const juliaCode = `%A = enzymexla.blas.syrk %X, %c0, %c1, %c0 {enzymexla.symmetric_matrix = [#enzymexla<guaranteed GUARANTEED>], output_uplo = #enzymexla.uplo<F>, transpose = #enzymexla.transpose<transpose>, uplo = #enzymexla.uplo<F>} : (tensor<100x100xf64>, tensor<100x100xf64>, tensor<f64>, tensor<f64>) -> tensor<100x100xf64>
%bA = stablehlo.multiply %b, %A {enzymexla.symmetric_matrix = [#enzymexla<guaranteed GUARANTEED>]} : tensor<100x100xf64>
%B = enzymexla.blas.syrk %A, %bA, %c, %c1 {output_uplo = #enzymexla.uplo<U>, uplo = #enzymexla.uplo<F>} : (tensor<100x100xf64>, tensor<100x100xf64>, tensor<f64>, tensor<f64>) -> tensor<100x100xf64>
%aX = stablehlo.multiply %a, %X {enzymexla.symmetric_matrix = [#enzymexla<guaranteed NOTGUARANTEED>]} : tensor<100x100xf64>
%ret = enzymexla.blas.symm %B, %X, %aX, %c1, %c1 {side = #enzymexla.side<right>, uplo = #enzymexla.uplo<U>} : (tensor<100x100xf64>, tensor<100x100xf64>, tensor<100x100xf64>, tensor<f64>, tensor<f64>) -> tensor<100x100xf64>
stablehlo.return ... %ret : ... tensor<100x100xf64>`;

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto' }}>
            <SyntaxHighlighter
                language="mlir"
                style={atelierForestLight}
                showLineNumbers={true}
                // wrapLongLines={true}
                customStyle={{
                    borderRadius: '12px',
                    padding: '20px',
                    fontSize: '14px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                {juliaCode}
            </SyntaxHighlighter>
        </div>
    );
}

const MEng = () => {
    return (<>
        <div className="projBody">
            <h1 className="projTitle">Automatic Detection and Compilation of Structured
                Tensors</h1>
            <h2 className="projSubtitle">MEng Thesis, 2025-26</h2>
            <p>
                For my MEng thesis, I worked on constructing a compiler framework for the automatic detection and optimization of structured tensors.
                <br /><br />
                You can read the full thesis <a href="meng.pdf">here</a>.
                <br /><br />
                The compiler works on top of Multi-Level Intermediate Representation, or MLIR. MLIR is an open-source compiler infrastructure under the LLVM Project that offers a semantically-rich foundation, which makes it much easier to infer structural properties directly from high-level tensor operations.
                <br /><br />

                To optimize a program, we define detection and propagation rules to track structure throughout a program and use this information to select structure-aware implementations during code generation.
                <br /><br />

                Compared to more traditional approaches, which typically require programmers to port their code to domain-specific languages or annotate structural properties themselves, our system provides a more robust and streamlined approach and enables consistent performance improvements for scientific computing workloads.
                <br /><br />
                One example of a benchmark we used to test performance on symmetric tensors is the Newton-Schulz Orthogonalization Iteration. This algorithm transforms either the columns or rows of a matrix into a set of orthonormal vectors. It is used in the Muon optimizer to perform fast, approximate orthogonalization of update matrices to accelerate the training of LLMs, and in many other scientific computing and machine learning applications.
                <br /><br />
                The Julia implementation of the benchmark is as follows:
                <br /><br />
                <JuliaCodeBlock />
                <br /><br />
                <MathJax>

                    It turns out that a significant portion of the Newton-Schulz iteration is computation involving symmetric matrices. The matrix $A$ is symmetric as it is the product of $X$ and $X^T$. Then, $B$ is also symmetric, since $AA$ is symmetric (as it is equivalent to $A^TA$, which we know to be symmetric), and the sum of two symmetric matrices must also be symmetric.

                    <br /><br />

                    Given our set of possible optimizations for symmetric matrices, several of these operations can be rewritten as specialized BLAS <span class="texttt">syrk</span> and <span class="texttt">symm</span> operations. Specifically, the multiplication $XX^T$ and the entire computation for $B$ can both be rewritten as <span class="texttt">syrk</span> operations. Then, $aX+BX$ can be rewritten as a <span class="texttt">symm</span> operation.
                </MathJax>


                <div className="captionedPhoto">

                    <MLIR />
                    <p>Newton-Schulz core loop after optimization pass.</p>

                </div>

                The above shows the core loop of the Newton-Schulz MLIR program after the detection and optimization passes are run on the program. The compiler was able to infer which matrices in the core loop were guaranteed to be symmetric, as well as rewrite all three general matrix multiplications into specialized calls.

                <div className="captionedPhoto smallPhoto">
                    <img src="meng.png" />
                    <p>Speed-up of structured tensor benchmarks over the default optimization options across different sizes of input matrices.</p>
                </div>

                This example, along with the rest of the evaluation in the thesis, confirmed that this approach yields meaningful performance improvements across structured workloads, at no additional effort from the programmer.

                <br /><br />
                More broadly, our compiler highlights the importance of preserving mathematical semantics in modern compiler design. As machine learning and scientific computing increasingly rely on high-level tensor abstractions, there seems to be a growing opportunity to bridge the gap between mathematical intent and low-level execution.
                <br /><br />

                If you're curious about how the compiler works in more detail, or interested in seeing the rest of the results and our vision for how it could be expanded in the future, you can read the full thesis <a href="meng.pdf">here</a>.

            </p>
        </div>
    </>);
}

export default MEng;