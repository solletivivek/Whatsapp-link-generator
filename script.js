document.addEventListener("DOMContentLoaded", function() {
    let btn = document.querySelector(".button");
    let qr_code_element = document.querySelector(".qr-code");

    btn.addEventListener("click", () => {
        let user_input = document.querySelector("#phone_number");
        if (user_input.value.trim() !== "") {
            clearQRCode();
            generate(user_input.value);
        } else {
            console.log("Not a valid input");
            qr_code_element.style.display = "none";
        }
    });

    function generate(phoneNumber) {
        qr_code_element.style = "";

        let whatsappLink = "https://wa.me/" + phoneNumber;

        let qrcode = new QRCode(qr_code_element, {
            text: whatsappLink,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        let buttonsContainer = document.querySelector(".buttons-container");
        buttonsContainer.innerHTML = "";

        let downloadButton = createButton("Download QR Code", qr_code_element, "qr_code_by_User.png");
        let redirectButton = createButton("Open WhatsApp", null, null, whatsappLink);

        buttonsContainer.appendChild(downloadButton);
        buttonsContainer.appendChild(redirectButton);
    }

    function createButton(text, targetElement, downloadFileName, redirectLink) {
        let button = document.createElement("button");
        button.innerHTML = text;

        if (downloadFileName) {
            let downloadLink = document.createElement("a");
            downloadLink.setAttribute("download", downloadFileName);
            downloadLink.appendChild(button);
            downloadLink.addEventListener("click", function () {
                if (targetElement) {
                    downloadLink.setAttribute("href", targetElement.querySelector("canvas").toDataURL());
                }
            });
            return downloadLink;
        } else if (redirectLink) {
            button.addEventListener("click", function () {
                window.location.href = redirectLink;
            });
        }

        return button;
    }

    function clearQRCode() {
        qr_code_element.innerHTML = "";
    }
});
