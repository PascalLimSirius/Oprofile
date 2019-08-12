require("jquery.scrollex");

var app = {
  init: function() {
    // Mise en place de scrollex
    //https://www.npmjs.com/package/jquery.scrollex
    // Je commence par cibler toutes mes sections dans mon main

    //console.log($('.main > section'));

    // Pour chaque section (each)...
    $(".main > section").each(function() {
      //console.log(this); this = ma section en cours

      var id = $(this).attr("id");

      //console.log(id);

      // J'applique scrollex sur mon element (ma section)
      $(this).scrollex({
        //Je dis à scrollex de se baser sur le milieu de la page (mode)
        mode: "middle",

        // lorsque mon élément rentre sur la page
        enter: function() {
          //console.log(this);
          //console.log("est entré sur la page");
          app.handleEnterElement(id);
        },

        // lorsque mon élément sort de la page
        leave: function() {
          //console.log(this);
          //console.log("est sorti de la page");
          app.handleLeaveElement(id);
        }
      });
    });

    // Mise en place de Smothscroll
    // Je vais cibler mes éléments de type a
    // a[href*="#"] => Je veux tous les elements a avec un href qui comporte une ancre (vide ou non => *)
    // not([href="#"]) => Parmis ceux-là, je ne veux pas ceux qui sont strictement égales à # (href="#")
    $('a[href*="#"]:not([href="#"])').on("click", app.handleClickOnAnchor);
  },
  handleEnterElement: function(element_id) {
    $('.navigation a[href="#' + element_id + '"]').addClass("active");
  },
  handleLeaveElement: function(element_id) {
    $('.navigation a[href="#' + element_id + '"]').removeClass("active");
  },
  handleClickOnAnchor: function(evt) {
    //console.log(evt);

    // Je supprime l'évènement par défaut (ancre)
    evt.preventDefault();

    // Je récupère l'élément sur lequel on a cliqué
    var clickedElement = evt.target;

    //console.log(clickedElement);

    // object.hash me permet de récupérer la partie # du href
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash
    //console.log(clickedElement.hash);

    // Je souhaite récupérer l'élément (jquerisé) ou je veux me rendre
    var $target = $(clickedElement.hash);

    //console.log($target);

    // Je regarde si la propriété .length me retourne quelque chose
    // En gros je vérifie que mon élément existe bien

    if ($target.length) {
      
      // Je viens calculer la position de mon élément ciblé
      // par rapport au haut de ma page
      var targetPosition = $target.offset().top;

      //console.log(targetPosition);

      // Je viens animer mon scroll
      $('html, body').animate({
        'scrollTop': targetPosition
      }, 2000);
    }
  }
};

$(app.init);
