//upload file
function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();
           reader.onload = function (e) {
                  var imgData = e.target.result;
                  localStorage.setItem("imgData", imgData);
                  document.getElementById("picture").style.backgroundImage = "url("+imgData+")";

           };

           reader.readAsDataURL(input.files[0]);
       }
   }


//load time
function checkTime(i) {
      if (i < 10) {
            i = "0" + i;
      }
      return i;
}

function startTime() {
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var s = today.getSeconds();
      // add a zero in front of numbers<10
      m = checkTime(m);
      s = checkTime(s);
      document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
      var t = setTimeout(function () {
            startTime()
      }, 500);
}

// Will be called when user starts dragging an element
function _drag_init(elem) {

    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        console.log(selected.id);
        selected.style.left = (x_pos - x_elem) + 'px';
        localStorage.setItem("left-" + selected.id , selected.style.left);
        selected.style.top = (y_pos - y_elem) + 'px';
        localStorage.setItem("top-" + selected.id ,selected.style.top);
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

// Assign color to words
function getColor(){
      document.getElementById("greetings").style.color ="#"+ localStorage.getItem('color');
      document.getElementById("quote").style.color = "#"+localStorage.getItem('color');
      document.getElementById("timeline").style.color = "#"+localStorage.getItem('color');
}

    var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element


document.addEventListener('DOMContentLoaded', function () {

      var name = document.getElementById("name");
      var input = document.getElementById("quote");
      var div1 = $("#div1");
      var todo2 = document.getElementById("todo2");
      document.designMode = "on";

      //load name
      if (localStorage.getItem('name')!==""){
            name.value = localStorage.getItem('name');
      }
      
      function resizeInput() {
            $('#name').attr('size', $("#name").val().length);
      }

      $('input[type="text"]')
      // event handler
      .keyup(resizeInput)
      // resize on page load
      .each(resizeInput);

      //load quote
      if (localStorage.getItem('quote')!==""){
            input.value = localStorage.getItem('quote');
      }

      //load time
      startTime();
      
       //load colour of words
       getColor();

      var fontFamily = localStorage.getItem('font-family');
      $('.words').css("font-family", fontFamily);

      //load todos
      if (localStorage.getItem('div1')!==""){
            div1.html(localStorage.getItem('div1'));
      }
      if (localStorage.getItem('todo2')!==""){
            todo2.value = localStorage.getItem('todo2');
      }

      //load image background
      var dataImage = localStorage.getItem('imgData');
      document.getElementById("picture").style.backgroundImage = "url("+dataImage+")";
      document.getElementById("picUpload").addEventListener("change", function(){
            readURL(this);
      });
      
      //change fonts 
      $("#fonts").on("change", function(){
            localStorage.setItem("font-family",$('#fonts').val());
            $('.words').css("font-family", $('#fonts').val());
      });
     
      
      //setting the value to localstorage
      name.addEventListener("keyup", function(){
           localStorage.setItem("name",name.value);
      });

      input.addEventListener("keyup", function(){
           localStorage.setItem("quote",input.value);
      });

     document.getElementById("div1").addEventListener("keyup", function(){
            console.log(div1.html());
           localStorage.setItem("div1",div1.html());
      });
      todo2.addEventListener("keyup", function(){
           localStorage.setItem("todo2",todo2.value);
      });

      document.getElementsByClassName("color")[0].addEventListener("change", function(){
            localStorage.setItem("color", document.getElementsByClassName("color")[0].value);
            getColor();
      });
      
      $(".button").on("click", function(){
            $("#settings").toggle();
      });
      
    
/*
       //draggable elements
       document.getElementById("div1").style.left = localStorage.getItem('left-div1');
       document.getElementById("div1").style.top = localStorage.getItem('top-div1');

       document.getElementById("div2").style.left = localStorage.getItem('left-div2');
       document.getElementById("div2").style.top = localStorage.getItem('top-div2');

      $(".movable").mousedown(function () {
            _drag_init(this);

            console.log("dfsv");
            return false;
      });
      $(".movable").keyup(function () {
          console.log(div1.html());
         localStorage.setItem("div1",div1.html());
      });

      document.onmousemove = _move_elem;
      document.onmouseup = _destroy; */

});
