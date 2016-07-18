// Helper Variables
var qs = document.querySelector.bind(document)
var qsAll = document.querySelectorAll.bind(document)
var log = console.log.bind(console)

//Variables
var featured = qs('#featured')


$(document).ready(function(){
  // Make nav work


  // On document scroll, change the navbar backround color
   var scroll_start = 0;
   var startchange = $('.nav-container');
   var offset = startchange.offset();

   $(document).scroll(function() {
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top + 50) {
        $('.nav-container').css('background-color', '#FCFC62');
        $('li>a').css('color', '#343431');
        $('.logo').css('background-color', '#343431')
        $('.logo').css('width', '35px')
        $('.logo').css('height', '50px')
       } else {
         $('.nav-container').css('background-color', '#343431');
         $('li>a').css('color', '#FCFC62');
         $('.logo').css('background-color', '#FCFC62')
         $('.logo').css('width', '70px')
         $('.logo').css('height', '100px')
       }
   });
});

document.body.addEventListener('click', function(e){
  if (e.target.getAttribute('href').includes('#')) {
    e.preventDefault()
    var target = e.target.innerHTML
    if (target === 'Home') {
      $(window).scrollTo('[name="' + target + '"]', {
        offset: -100
      })
    } else {
      $(window).scrollTo('[name="' + target + '"]', {
        offset: -60
      })
    }
  }


  // if(e.target.parentNode.parentNode.classList.contains('thumbnail') || e.target.parentNode.classList.contains('thumbnail') || e.target.classList.contains('thumbnail')) {
  //   window.location.href = '/detail.html?id=' + e.target.parentNode.getAttribute('data-id')
  // }
})


// jQuery Date Picker Plugin
$('#date').datepick({dateFormat: 'yyyy-mm-dd'});


// Fetch my work!
fetch('http://localhost:8000/api/v1/portfolio')

  .then(function(jsonData){
    return jsonData.json()
  })

  .then(function(data){

    var row = document.createElement('div')
    row.classList.add('row')

    data.forEach(function(item, i){

      //Code to dynamically create content elements

      var col = document.createElement('div')
      col.classList.add('col-sm-4')

      var thumbnail = document.createElement('div')
      thumbnail.classList.add('thumbnail')
      thumbnail.setAttribute('data-id', item.id)

      var img = document.createElement('img')
      img.setAttribute('src', item.image)

      var caption = document.createElement('div')
      caption.classList.add('caption')

      var captionTitle = document.createElement('h4')
      var text = document.createTextNode(item.title)

      captionTitle.appendChild(text)
      caption.appendChild(captionTitle)
      thumbnail.appendChild(img)
      thumbnail.appendChild(caption)
      col.appendChild(thumbnail)
      row.appendChild(col)

      featured.appendChild(row)

    })
  })
