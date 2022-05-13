var savedIDs = new Array();

const courseTemplate = (title, id, description, furl) => {
    const courseContainer = $('<div>').attr({
        class: 'content-course__list',
        id: id
    });
    const img = $('<img>').attr('src', furl);
    const name = $('<h2>');
    const spec = $('<p>')
    name.html(title)
    spec.html(description)
    courseContainer.append(img, name, spec);
    return courseContainer;
};


const displayNewCourse = (courses) => {

    for (var i =0; i< courses.length ;i++) {
        url = "https:elearning-aueb.herokuapp.com/static/images/"
        var title = courses[i].title;
        const id = courses[i].id;
        var description = courses[i].description;
        var img = courses[i].img;
        furl = url.concat(img);
        const newCourse = courseTemplate(title, id, description, furl);
        $('.content-course').prepend(newCourse);
        $('input').val('');
      }
      return courses;
};





$('button[type="submit"]').on('click', function(event){
    $('#content-course').empty();
    event.preventDefault();
    
    const course = $('input[name="course_title"]').val();

    url = ( "https://elearning-aueb.herokuapp.com/courses/search?title=").concat(course);

    let settings = { method: "Get" };

    fetch(url, settings)
    .then((response) => {

        return response.json();
    })
    .then(displayNewCourse)
});