import './style.css';


//  init appInput with pi
document.querySelector('#inputConstant').value = Math.PI

//on input, iterate for best estimation
document.querySelector('#btnApproximate').addEventListener('click', () => {
    const constant = parseFloat(document.querySelector('#inputConstant').value);
    const iterations = parseInt(document.querySelector('#inputIterations').value);

    // Perform approximation logic here
    let bestEstimate = {
        "a:": 1,
        "b:": 1,
        "estimate": 1,
        "delta": Math.abs(constant - 1)
    };
    // clear app output
    document.querySelector('#appOutput').innerHTML = '';
    for (let a = 1; a <= iterations; a++) {
        for (let b = 1; b <= iterations; b++) {
            const estimate = a / b;
            const delta = Math.abs(constant - estimate);
            if (delta < bestEstimate.delta) {
                bestEstimate = { a, b, estimate, delta };
                document.querySelector('#appOutput').innerHTML += `
        <p>Best Estimate: ${bestEstimate.estimate}</p>
        <p>a: ${bestEstimate.a}</p>
        <p>b: ${bestEstimate.b}</p>
        <p>Delta: ${bestEstimate.delta}</p>
        <hr>
    `;
            }
        }

    };

});

