!(function ($) {
  "use strict";

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Initialize Venobox
  $(window).on("load", function () {
    $(".venobox").venobox({
      bgcolor: "",
      overlayColor: "rgba(6, 12, 34, 0.85)",
      closeBackground: "",
      closeColor: "#fff",
      share: false,
      titleattr: "data-title",
    });
    $(".venoboxOfficer").venobox({
      bgcolor: "",
      overlayColor: "rgba(6, 12, 34, 0.85)",
      closeBackground: "",
      closeColor: "#fff",
      share: false,
      titleattr: "data-title",
      cb_post_open: function () {
        $(".vbox-inline").addClass("rounded-lg");
      },
      cb_after_nav: function () {
        $(".vbox-inline").addClass("rounded-lg");
      },
    });
  });

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button name = "mobile-nav-toggle" type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav").find(".menu-has-children").prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 21;
  if (window.matchMedia("(max-width: 991px)").matches) {
    scrolltoOffset += 20;
  }
  $(document).on("click", ".nav-menu a, #mobile-nav a, .scrollto", function (e) {
    if (
      location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == "#header") {
          scrollto = 0;
        }

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("menu-active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("menu-active");
      }
      if (cur_pos < 300) {
        $(".nav-menu li:first").addClass("menu-active");
      }
    });
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  $("#buy-ticket-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data("ticket-type");
    var modal = $(this);
    modal.find("#ticket-type").val(ticketType);
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });

  //Handling for Calendar
  let date = new Date(),
    month = date.getMonth(),
    year = date.getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  /*for testing and for keeping the format
//last year meeting times
const testEventsArray = [
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting # 1",
      startDate: "2022-09-15",
      endDate: "2022-09-15",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #2",
      startDate: "2022-09-22",
      endDate: "2022-09-22",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #3",
      startDate: "2022-09-29",
      endDate: "2022-09-29",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #4",
      startDate: "2022-10-20",
      endDate: "2022-10-20",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #5",
      startDate: "2022-10-27",
      endDate: "2022-10-27",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "B-179 LGI",
    properties: {
      name: "General Meeting #6",
      startDate: "2022-11-17",
      endDate: "2022-11-17",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Lower Cafeteria",
    properties: {
      name: "General Meeting #7",
      startDate: "2022-12-22",
      endDate: "2022-12-22",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #8",
      startDate: "2023-01-19",
      endDate: "2023-01-19",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Lower Cafeteria",
    properties: {
      name: "General Meeting #9",
      startDate: "2023-02-16",
      endDate: "2023-02-16",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #10",
      startDate: "2023-03-23",
      endDate: "2023-03-23",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Middle Cafeteria",
    properties: {
      name: "General Meeting #11",
      startDate: "2023-04-20",
      endDate: "2023-04-20",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Meeting",
    location: "Lower Cafeteria",
    properties: {
      name: "General Meeting #12",
      startDate: "2023-05-18",
      endDate: "2023-05-18",
      startTime: "14:00",
      endTime: "15:10",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Event",
    properties: {
      name: "FBLA EHT Pride Festival",
      startDate: "2022-09-24",
      endDate: "2022-09-24",
      startTime: "10:00",
      endTime: "15:00",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Event",
    properties: {
      name: "Trunk or Treat",
      startDate: "2022-10-15",
      endDate: "2022-10-15",
      startTime: "10:00",
      endTime: "15:00",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Event",
    properties: {
      name: "FBLA EHT Nerfball",
      startDate: "2023-01-06",
      endDate: "2023-01-06",
      startTime: "17:00",
      endTime: "21:00",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
  {
    type: "Event",
    properties: {
      name: "SLC",
      startDate: "2023-03-06",
      endDate: "2023-03-08",
      startTime: "11:00",
      endTime: "15:00",
      label: "Add To Calendar",
      options: ["Google", "Microsoft365", "Yahoo", "Apple"],
      timeZone: "America/New_York",
      inline: true,
      trigger: "click",
    },
  },
]; 
*/
  const eventsArray = [
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #1",
        startDate: "2024-09-16",
        endDate: "2024-09-16",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #2",
        startDate: "2024-09-26",
        endDate: "2024-09-26",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "Officer/Committe Meeting",
        startDate: "2024-10-14",
        endDate: "2024-10-14",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #3",
        startDate: "2024-10-17",
        endDate: "2024-10-17",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "Officer/Committee Meeting",
        startDate: "2024-11-11",
        endDate: "2024-11-11",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #4",
        startDate: "2024-12-16",
        endDate: "2024-12-16",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "Officer/Committee Meeting",
        startDate: "2025-01-13",
        endDate: "2025-01-13",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #5",
        startDate: "2025-01-16",
        endDate: "2025-01-16",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "Officer/Committee Meeting",
        startDate: "2025-02-10",
        endDate: "2025-02-10",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },
    {
      type: "Meeting",
      location: "Middle Cafeteria",
      properties: {
        name: "General Meeting #6",
        startDate: "2025-02-13",
        endDate: "2025-02-13",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      }
    },



    {
      type: "Event",
      properties: {
        name: "Officer Training",
        startDate: "2024-08-15",
        endDate: "2024-08-15",
        startTime: "9:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Freshman Orientation",
        startDate: "2024-08-26",
        endDate: "2024-08-26",
        startTime: "9:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "EHT Pride Day",
        startDate: "2024-09-21",
        endDate: "2024-09-21",
        startTime: "11:00",
        endTime: "15:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Community Service: Shoprite Bagging",
        startDate: "2024-10-12",
        endDate: "2024-10-12",
        startTime: "10:00",
        endTime: "14:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Community Service: Trunk or Treat",
        startDate: "2024-10-19",
        endDate: "2024-10-19",
        startTime: "16:00",
        endTime: "19:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Fall Summit at Kean University (TBD)",
        startDate: "2024-10-23",
        endDate: "2024-10-23",
        startTime: "12:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Fundraiser: Bake Sale",
        startDate: "2024-10-24",
        endDate: "2024-10-24",
        startTime: "14:10",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Multi-club Holiday party",
        startDate: "2024-11-11",
        endDate: "2024-11-11",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Induction Dinner",
        startDate: "2024-11-14",
        endDate: "2024-11-14",
        startTime: "18:00",
        endTime: "20:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Community Service: Turkey Drive",
        startDate: "2024-11-16",
        endDate: "2024-11-16",
        startTime: "12:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Community Service: Shoprite Bagging",
        startDate: "2024-12-14",
        endDate: "2024-12-14",
        startTime: "10:00",
        endTime: "14:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Multi-club Holiday party",
        startDate: "2024-12-19",
        endDate: "2024-12-19",
        startTime: "14:00",
        endTime: "15:10",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Community Service: Shoprite Bagging",
        startDate: "2025-01-25",
        endDate: "2025-01-25",
        startTime: "10:00",
        endTime: "14:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "FBLA WEEK",
        startDate: "2025-02-09",
        endDate: "2025-02-15",
        startTime: "00:00",
        endTime: "23:59",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "Fundraiser: Spike-A-Thon",
        startDate: "2025-02-28",
        endDate: "2025-02-28",
        startTime: "17:00",
        endTime: "21:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "SLC",
        startDate: "2025-03-10",
        endDate: "2025-03-12",
        startTime: "15:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Event",
      properties: {
        name: "NLC",
        startDate: "2025-06-29",
        endDate: "2025-07-02",
        startTime: "12:00",
        endTime: "12:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },
    {
      type: "Workshop",
      properties: {
        name: "Resume Building",
        startDate: "2025-04-10",
        endDate: "2025-04-10",
        startTime: "14:00",
        endTime: "15:15",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
       }
    },

    /*{
      type: "Event",
      properties: {
        name: "FBLA EHT Nerfball",
        startDate: "2024-01-12",
        endDate: "2024-01-12",
        startTime: "17:00",
        endTime: "21:00",
        label: "Add To Calendar",
        options: ["Google", "Microsoft365", "Yahoo", "Apple"],
        timeZone: "America/New_York",
        inline: true,
        trigger: "click",
      },
    },*/
  ];
  //Date converted to MM/DD/YY
  function dateConverted(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  //Converted to nonmilitary time AM/PM ASSUMING
  function timeConverted(time) {
    let hour = Number(time.split(":")[0]),
      minute = time.split(":")[1];
    if (hour > 12) {
      return `${hour - 12}:${minute}pm`;
    } else if (hour > 11) {
      return `${hour}:${minute}pm`;
    } else if (hour > 0) {
      return `${hour}:${minute}am`;
    } else {
      return `12:${minute}am`;
    }
  }

  function createEventCard(parent, card, event) {
    let time = event.properties.startTime,
      date = new Date(`${event.properties.startDate}T00:00`);
    card.find("time").text(timeConverted(time));
    card.find("h4").text(event.properties.name);
    card.find("date").text(dateConverted(date));
    card.find(".atcbContainer").append(
      `<add-to-calendar-button 
      name = ${JSON.stringify(event.properties.name)}  
      startDate = ${event.properties.startDate}  
      endDate = ${event.properties.endDate} 
      startTime = ${event.properties.startTime}  
      endTime = ${event.properties.endTime}   
      label = ${JSON.stringify(event.properties.label)}  
      timeZone = ${event.properties.timeZone}
      inline = ${event.properties.inline} 
      listStyle = "modal"
      options = ${JSON.stringify(event.properties.options)} 
      trigger = ${event.properties.trigger}  
      ></add-to-calendar-button>`
    );
    parent.append(card);
  }

  function renderEvents(events) {
    events.forEach((event) => {
      let id, template, card;
      if (event.type === "Meeting") {
        id = "#day-1";
        template = $("#template_meetingCard").html();
        card = $(template).clone();
        card.find("place").text(event.location);
      } else if (event.type === "Event") {
        id = "#day-2";
        template = $("#template_eventCard").html();
        card = $(template).clone();
      } else {
        id = "#day-3";
        template = $("#template_workshopCard").html();
        card = $(template).clone();
      }
      createEventCard($(id), card, event);
    });

    $(".eventTab").each(function () {
      if ($(this).children().length === 0) {
        $(this).html(`<h2 class="m-auto">Coming Soon!</h2>`);
      }
    });
  }

  function renderCalendar(events) {
    $(".days:first").empty();
    $("#schedule_currentDate").text(months[month] + " " + year);
    let firstDayofMonth = new Date(year, month, 1).getDay(),
      lastDateofMonth = new Date(year, month + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(year, month, lastDateofMonth).getDay(), // getting last day of month
      lastDateofLastMonth = new Date(year, month, 0).getDate(), // getting last date of previous month
      days = [],
      classes = [];
    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(lastDateofLastMonth - i + 1);
      classes.push("inactive");
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
      let isToday =
        i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
          ? "active selected"
          : "";
      let hasEvents = events.some(
        (event) =>
          new Date(`${event.properties.startDate}T00:00`).getTime() <=
            new Date(year, month, i).getTime() &&
          new Date(`${event.properties.endDate}T00:00`).getTime() >= new Date(year, month, i)
      )
        ? " event "
        : "";

      days.push(i);
      classes.push(isToday + hasEvents);
    }
    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(i - lastDayofMonth + 1);
      classes.push("inactive");
    }
    for (let i = 0; i < days.length; i++) {
      let dayElement = $("<div></div>")
        .addClass(`day schedule_calendarElement p-2  ${classes[i]}`)
        .text(days[i]);
      $(".days:first").append(dayElement);
    }
  }

  function getDaysEvents(events) {
    $("#schedule_dayEvent").empty();

    let checkMonth = 0,
      checkYear = 0;
    if ($(".selected").hasClass("inactive")) {
      checkMonth = Number($(".selected").text()) > 24 ? -1 : 1;
      if (month + checkMonth < 0 || month + checkMonth > 12) {
        checkYear = month + checkMonth < 0 ? -1 : 1;
        checkMonth = checkYear === -1 ? 11 : -11;
      }
    }
    let selectedDate = new Date(
        year + checkYear,
        month + checkMonth,
        Number($(".selected").text())
      ),
      withinAnyEventDates = events.some(
        (event) =>
          new Date(`${event.properties.startDate}T00:00`).getTime() <= selectedDate.getTime() &&
          new Date(`${event.properties.endDate}T00:00`).getTime() >= selectedDate.getTime()
      );
    $("#schedule_todayHeading").text(
      `${months[month + checkMonth]} ${$(".selected").text()}, ${year + checkYear}`
    );
    if (events && withinAnyEventDates) {
      let template = $("#template_todayEvent").html(),
        card = $(template).clone(),
        event = events.filter(
          (event) =>
            new Date(`${event.properties.startDate}T00:00`).getTime() <= selectedDate.getTime() &&
            new Date(`${event.properties.endDate}T00:00`).getTime() >= selectedDate.getTime()
        );
      createEventCard($("#schedule_dayEvent"), card, event[0]);
    } else {
      $("#schedule_dayEvent").append($("<p>No events today</p>").addClass("text-center"));
    }
  }

  $(".schedule_prevNextIcon").click(function () {
    month = $(this).is(".schedule_prevNextIcon:first-child") ? month - 1 : month + 1;
    if (month < 0 || month > 11) {
      date = new Date(year, month, new Date().getDate());
      year = date.getFullYear();
      month = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar(eventsArray);
  });
  $(window).on("load", function () {
    renderCalendar(eventsArray);
    renderEvents(eventsArray);
    getDaysEvents(eventsArray);
  });

  $(document).on("click", ".day", function () {
    let oldSelect = $(".selected");
    oldSelect.removeClass("selected");
    $(this).addClass("selected");
    getDaysEvents(eventsArray);
  });
})(jQuery);
