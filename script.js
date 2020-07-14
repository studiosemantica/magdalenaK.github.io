console.log($)

const url = 'https://spreadsheets.google.com/feeds/list/1E2ridB2TyMGdd5tduhDNsan5KZvByoGgD5jonASuTuI/od6/public/values?alt=json'

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
        
//         // console.log(data)
//         console.log(data.feed.entry)
//         const projects = data.feed.entry.map(entry => {
//             return {
//                 title: entry.gsx$title.$t,
//                 image: entry.gsx$image.$t,
//                 description: entry.gsx$description.$t,
//                 url: entry.gsx$url.$t

//             }
//         })
//         app(projects)
//     })

// const app = (data) => {
//     console.log('app is running!')
//     console.log(data)

//     const createProjectElement = (project) => {
//         const $div = $('<div>')
//         $div.append($('<h2>').text(project.title))
//         $div.append($('<p>').text(project.description))
//         $div.append($('<img>').attr('src',project.image))
//         $div.append($('<a>').attr('href',project.url).text('link>>>'))
//         return $div
//     }

//         data.forEach( project => {
//             const $projectDiv = createProjectElement(project)
//             $('body').append($projectDiv)
//         })
// }

fetch(url)  // starts the fetch process
    .then( response => response.json() )    // returns the JSON data as a JS object
    .then( data => {

        // creates an array of parsed project objects
        const projects = data.feed.entry.map( entry => {
             return {
                title: entry.gsx$title.$t,
                image: entry.gsx$image.$t,
                description: entry.gsx$description.$t,
                url: entry.gsx$url.$t
             }
         })
         
         app(projects)  // calls the application with your new projects array as argument

    })

// all application logic is included inside the app() function    
const app = (projects) => {

    // creates a jQuery DOM element based on an individual project object
    const createProjectElement = (project) => {
        const $div = $('<div>').addClass("project")
        const $divOverlay = $('<div>').addClass("overlay")
        const $overlayText = $('<div>').addClass("overlayText").append($('<h2>').text(project.title))
        const $imageDiv = $('<div>').addClass("imageDiv").append($('<img>').attr('src', project.image))
        // $div.append($('<h2>').text(project.title))
        $div.append($($divOverlay).append($($overlayText).append($($imageDiv))))
        $div.append($('<p>').addClass("description").text(project.description))
        $div.append($('<button>').append($('<a>').attr('href', project.url).addClass("list-group-item").append($('<i>').addClass("fa fa-codepen").append($('<a>').addClass("small").text('Live Demo')))))

        // <a class="list-group-item" href="#"><i class="fa fa-codepen" aria-hidden="true"></i></a>
        // $div.append($('<a>').attr('href', project.url).text("LINK >>"))
        return $div
    }

    // adds each project element to <body>
    projects.forEach(project => {
        const $projectDiv = createProjectElement(project)
        $('body').append($projectDiv)
    })

}