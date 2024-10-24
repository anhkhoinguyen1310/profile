document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section'); // All sections
    const navLinks = document.querySelectorAll('.nav-link'); // Navbar links
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    var copyLogos = document.querySelector(".tech-skills-slides").cloneNode(true);
    document.querySelector(".tech-skills").appendChild(copyLogos);

    let currentSection = 'home'; // Track the last active section

    window.addEventListener('scroll', () => {
        let contactReached = false;

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - navbarHeight * 3) {
                currentSection = section.id;

                if (currentSection === 'contact') {
                    contactReached = true;
                }
            }
        });

        navLinks.forEach(navLink => {
            if (navLink.href.includes(currentSection)) {
                document.querySelector('.active').classList.remove('active');
                navLink.classList.add('active');
            }
        });

        // Check if the bottom of the page is reached and activate "Contact"
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            document.querySelector('.active').classList.remove('active');
            document.querySelector('a[href="#contact"]').classList.add('active');
        } else if (!contactReached) {
            // Ensure other links don't remain active when we aren't in a specific section
            if (currentSection !== 'contact') {
                document.querySelector('.active').classList.remove('active');
                document.querySelector(`a[href="#${currentSection}"]`).classList.add('active');
            }
        }
    });
});

console.log("EmailJS status: ", emailjs);

function sendMail() {
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_6yqoy4w", "template_7q2oesr", parms)
        .then(function (response) {
            alert("Email Sent Successfully!");
        }, function (error) {
            console.error("Failed to send email: ", error);
            alert("Failed to send email. Please try again later.");
        });
}
