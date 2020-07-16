



console.log($)

$(document).ready(function() {
	$("body").on('click', '.fa-bars', function() {
		$("nav.dropDownMenu").toggleClass("dropDown");
	});
});

$(document).ready(function() {
	$("body").on('click', '.fa-chevron-down', function() {
		$("nav.dropDownMenu").toggleClass("dropDown");
	});
});
const url = 'https://spreadsheets.google.com/feeds/list/1E2ridB2TyMGdd5tduhDNsan5KZvByoGgD5jonASuTuI/od6/public/values?alt=json'


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

         let mq = window.matchMedia( "(max-width: 400px)" );
        if (mq.matches) {
    // if window width is at less than 400 px then run the mobile jQuery function to layout and style elements 

            mobile(projects)
        }
        else {
            desktop(projects)
    // if window width is greater than 400px then run the desktop jQuery function to layout and style elements
        }
         
         
    })





// all application logic is included inside the app() function    
const mobile = (projects) => {

    // creates a jQuery DOM element based on an individual project object
    const createProjectElement = (project) => {
        const $div = $('<div>').addClass("project")
        //declare variable for transparent overlay div on project preview
        const $imageDiv = $('<div>').addClass("imageDiv").append($('<img>').attr('src', project.image))
         //declare variable for image div
        const $divOverlay = $('<div>').addClass("overlay")
        //declare variable for overlay text div on project preview
        const $overlayText = $('<div>').addClass("overlayText").append($('<h2>').text(project.title))
       
        
        // $div.append($('<h2>').text(project.title))
        $div.append($($divOverlay).append($($overlayText).append($($imageDiv))))
        $div.append($('<p>').addClass("description").text(project.description))
        $div.append($('<button>').append($('<a>').attr('href', project.url).addClass("list-group-item").append($('<i>').addClass("fa fa-codepen").append($('<a>').addClass("small").text('Live Demo')))))


        return $div
    }

    // adds each project element to <div id="Projects">

    projects.forEach(project => {
        
        const $projectDiv = createProjectElement(project)
        $('#Projects').append($projectDiv)
    })

}






// all application logic is included inside the app() function    
const desktop = (projects) => {

    // creates a jQuery DOM element based on an individual project object
    const createProjectElement = (project) => {
        const $div = $('<div>').addClass("project")
        //declare variable for transparent overlay div on project preview
        const $imageDiv = $('<div>').addClass("imageDiv").append($('<img>').attr('src', project.image))
         //declare variable for image div
        const $divOverlay = $('<div>').addClass("overlay")
        //declare variable for overlay text div on project preview
        const $overlayText = $('<div>').addClass("overlayText").append($('<h2>').text(project.title))
       
        
        // $div.append($('<h2>').text(project.title))
        $div.append($($divOverlay).append($($overlayText).append($($imageDiv))))

        $div.append($('<p>').addClass("description").text(project.description))
        
        $div.append($('<button>').append($('<a>').attr('href', project.url).addClass("list-group-item").append($('<i>').addClass("fa fa-codepen").append($('<a>').addClass("small").text('Live Demo')))))


        return $div
    }

        // creates a jQuery DOM element based on an individual project object
        const featuredProjectDiv = (project) => {
            const $bigDiv = $('<div>').addClass("bigDiv")
            //declare variable for transparent overlay div on project preview
            const $imageBigDiv = $('<div>').addClass("imageBigDiv").append($('<img>').attr('src', project.image).width('100%').height('100%'))
             //declare variable for image div
            const $divBigOverlay = $('<div>').addClass("bigOverlay")
            //declare variable for overlay text div on project preview
            const $overlayBigText = $('<div>').addClass("overlayBigText").append($('<h1>').text(project.title))
           
            
            // $div.append($('<h2>').text(project.title))
            $bigDiv.append($($divBigOverlay).append($($overlayBigText).append($($imageBigDiv))))
    
            $bigDiv.append($('<p>').addClass("description").text(project.description))
            
            $bigDiv.append($('<button>').append($('<a>').attr('href', project.url).addClass("list-group-item").append($('<i>').addClass("fa fa-codepen").append($('<a>').addClass("small").text('Live Demo')))))
    
    
            return $bigDiv
        }

    // adds each project element to <body>


    projects.forEach((project,index) => {
        
        if (index === 0) {
        const $bigFeatureDiv = featuredProjectDiv(project)
        $('#feature').append($bigFeatureDiv)
        }

        else {
        const $projectDiv = createProjectElement(project)
        $('#desktop').append($projectDiv)
        }
    })

}
