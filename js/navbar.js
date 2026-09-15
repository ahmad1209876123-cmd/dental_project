/* =========================================
   SMILECARE REUSABLE NAVBAR
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbarContainer =
        document.getElementById("navbar");

    if (!navbarContainer) {
        return;
    }


    /* =========================================
       LOAD NAVBAR COMPONENT
    ========================================= */

    fetch("components/navbar.html")

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Navbar component could not be loaded."
                );
            }

            return response.text();

        })

        .then(function (data) {

            navbarContainer.innerHTML = data;

            initializeNavbar();

        })

        .catch(function (error) {

            console.error(
                "Navbar Error:",
                error
            );

        });


    /* =========================================
       NAVBAR FUNCTIONS
    ========================================= */

    function initializeNavbar() {

        const navbarToggle =
            document.getElementById("navbarToggle");

        const navbarMenu =
            document.getElementById("navbarMenu");


        if (!navbarToggle || !navbarMenu) {
            return;
        }


        /* =========================================
           HAMBURGER OPEN / CLOSE
        ========================================= */

        navbarToggle.addEventListener(
            "click",
            function () {

                navbarMenu.classList.toggle("open");

                navbarToggle.classList.toggle("active");


                const menuOpen =
                    navbarMenu.classList.contains("open");


                navbarToggle.setAttribute(
                    "aria-expanded",
                    menuOpen
                );


                navbarToggle.setAttribute(
                    "aria-label",
                    menuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

            }
        );


        /* =========================================
           CLOSE MENU AFTER LINK CLICK
        ========================================= */

        const navbarLinks =
            navbarMenu.querySelectorAll("a");


        navbarLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navbarMenu.classList.remove(
                        "open"
                    );

                    navbarToggle.classList.remove(
                        "active"
                    );

                    navbarToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    navbarToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }
            );

        });


        /* =========================================
           CLOSE MENU OUTSIDE
        ========================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navbarMenu.contains(
                        event.target
                    ) &&
                    !navbarToggle.contains(
                        event.target
                    )
                ) {

                    navbarMenu.classList.remove(
                        "open"
                    );

                    navbarToggle.classList.remove(
                        "active"
                    );

                    navbarToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    navbarToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                }

            }
        );


        /* =========================================
           ACTIVE PAGE
        ========================================= */

        let currentPage =
            window.location.pathname
            .split("/")
            .pop();


        if (
            currentPage === "" ||
            currentPage === "/"
        ) {

            currentPage = "index.html";

        }


        const pageLinks =
            navbarMenu.querySelectorAll(
                "[data-page]"
            );


        pageLinks.forEach(function (link) {

            const page =
                link.getAttribute("data-page");


            if (
                currentPage ===
                page + ".html"
            ) {

                link.classList.add("active");

            }

        });

    }

});