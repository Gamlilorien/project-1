
//***************************** */
//GLOBAL VARIABLES
//searchDate
//


//***************************** */
//FIREBASE
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDLWK0AgV3ynxApEe74ywNZQM7HEV_-IcM",
  authDomain: "hiking-trails-222819.firebaseapp.com",
  databaseURL: "https://hiking-trails-222819.firebaseio.com",
  projectId: "hiking-trails-222819",
  storageBucket: "hiking-trails-222819.appspot.com",
  messagingSenderId: "172585916997"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(database);


//*************************** */
//FUNCTIONS
function captureSearch() {
          //FUNCTION: to capture search values and either pass to other APIs or save as local values
          var search2 = $("#search2").val().trim();
          searchDate = $("#searchDate").val().trim();

          //Activites need to be combined into a single variable
          var activities = [];
          if ($("#hiking-checkbox").prop('checked') == true) {
            //IF true, then save as 1 value for later validation
            // hiking = 1;
            activities.push($("#hiking-checkbox").val().trim());
          }
          if ($("#biking-checkbox").prop('checked') == true) {
            //IF true, then save as 1 value for later validation
            // biking = 1;
            activities.push($("#biking-checkbox").val().trim());
          }
          if ($("#camping-checkbox").prop('checked') == true) {
            //IF true, then save as 1 value for later validation
            // camping = 1;
            activities.push($("#camping-checkbox").val().trim());
          }
          //determine total count of activities
          var activityCount = activities.length;
          //convert into a comma deliminated string
          var activitiesString = "";

          for (var i = 0; i < activityCount; i++) {

            if (i === 0) {
              //For first activity, simply set initial value only
              activitiesString = activities[i];
            };

            if (i > 0) {
              //for all subsequent activities, append them to initial value using a comma as a prefix
              activitiesString += "," +activities[i];
            };
          
          //Clear form values
          $("#searchForm")[0].reset();

        };
          // console.log(search2);
          // console.log(searchDate);
          // console.log(activitiesString);
          //now pass to Firebase
          dbPush(search2, activitiesString);
          //now pass to Recreation API
          findRecAreas(search2, activitiesString);
          
};


function findRecAreas(var1, var2) {
          //FUNCTION: to take values from the captureSearch() function and pass to recreation API and save JSON object results as a global variable
          //addtional notes
          //FacilityTypeDescription: "Facility" is a generic description that seems to apply to everything BUT "Campgrounds"
          //Example Lat and Long 39.994118, -105.633991
          //FacilityLatitude: 39.994118 
          //FacilityLongitude: -105.633991

          //ie campsites, facilities (ie places, also allows for a query= search), and recareas
          var method = "facilities";
          //***QUERY option is ONLY valid for facilities endPoint
          //query input from user
          var queryInput = var1;
          var query = "query=" +queryInput +"&";
          var limit = 50;
          var offset = 0;
          var state = "CO";
          //activities are comma seperated and you can either use the activity name or it's ID.
          //Biking = 5, Camping = 9, Hiking = 14
          var activities = var2;
          var apikey = "0bde3bb5-6af0-4171-8311-755a6fb73015";
          var queryURL = "https://ridb.recreation.gov/api/v1/" + method +"?" +query +"limit=" + limit +"&offset=" +offset +"&state=" +state +"&activity=" +activities +"&apikey=" +apikey;
          // console.log(queryURL);

          var settings = {
            "url": queryURL,
            "method": "GET"
          };
          
      $.ajax(settings).done(function (response) {
        recAreas = response.RECDATA;
        console.log(recAreas);

        //now set results into HTML as accordian object
        //it needs to be here so it ONLY triggers after API call finishes
        buildAccordian();
      });
      
  
};


function buildAccordian () {
          //FUNCTION: to take the results from the findRecAreas() function and loop through each item in the array to build main Accordian content
          //NOTES: basic format of HTML is as follows
            // <li>
            //   <div class="collapsible-header">Browns Canyon National Monument</div>
            //   <div class="collapsible-body"><span>Browns Canyon National Monument , a 21,586 acres (8,736 ha) national monument in Chaffee County, Colorado was designated as such by President Barack Obama under the Antiquities Act on February 19, 2015.</span></div>
            // </li>

          //**** NEW FORMAT */
          // <li>
          //     <div class="collapsible-header tab-titles" id="starColor"><i class="material-icons" >star_border</i>The Loch Trail</div>
          //        <div class="collapsible-body">
          //            <div class="row">
          //                <div class="col l12">
                    //             <!-- Where park info/description will appear -->
                    //             <blockquote>
                    //                 The hike to The Loch begins from the Glacier Gorge Trailhead, located on Bear Lake Road almost 8 miles from the turn-off at Highway 36. Due to the extreme popularity of the Bear Lake Road area you may want to consider using the free park shuttle to access the trailhead during peak season.
                    //               Roughly one-quarter of a mile from the parking area, just after crossing Chaos Creek, the trail briefly converges with the Glacier Creek Trail. After walking a very short distance the Glacier Creek Trail splits off to the right and heads toward Bear Lake. To continue on towards The Loch hikers should turn left at this junction.
                                  
                    //               alberta-fallsAt just over eight-tenths of a mile hikers will reach Alberta Falls, one of the more popular hiking destinations in Rocky Mountain National Park. This scenic 30-foot waterfall thunders down a small gorge on Glacier Creek, and is named after Alberta Sprague, the wife of Abner Sprague, one of the first settlers in the Estes Park area.
                    //             </blockquote>
                    //             <!-- Button for opening a new window for info -->
                    //             <div>
                    //               <a class="waves-effect waves-light btn tab-buttons right"><i class="material-icons right">chevron_right</i>Learn More</a>
                    //             </div>
          //                </div>
          //            </div>

          //       <div class="row">
          //             <div class="col l12">
          //                 <img class="materialboxed boxes" id="box-info" src="Untitled.png">
          //                 <img class="materialboxed boxes" id="box-info" src="weather-ex.jpg">
          //             </div>
          //     </div>
          // </li>
          
          //FIRST - remove previous results (if any)
          $("#accordian").html("");
          
          //disabled for now to simply hard code for first 10 results
          // var arrayCount = recAreas.length;
          for (var i = 0; i < 10; i++) {
            
            var name = recAreas[i].FacilityName;
            var description = recAreas[i].FacilityDescription;
            //For type, campgrounds are simply Campground, where as Facility is for everyting else...
            var type = recAreas[i].FacilityTypeDescription;
            
            //don't need these yet so disabled for now
            // var facilityID = recAreas[i].FacilityID;
            // var latitude = recAreas[i].FacilityLatitude;
            // var longitude = recAreas[i].FacilityLongitude;
            // var mainRow = $("<div>").attr({"class": "row"})
            // var mainRowCol = $("<div>").attr({"class": "col l12"}).append($("<blockquote>").html(description))
            var star = $("<i>").attr({"class": "material-icons"}).html("star-border");
            var heading = $("<span>").html(name);

            var moreButton = $("<div>").append(
              $("<a>").attr({"class": "waves-effect waves-light btn tab-buttons right", "href": "test-googlemapsapi.html", "target": "_blank"}).html("Learn More").append($("<i>").attr({"class": "material-icons right"}).html("chevron_right"))
            )
            var containerRow = $("<div>").attr({"class": "row"}).append(
              $("<div>").attr({"class": "col l6"}).append(
                $("<div>").attr({"class": "genMap", "id": "map"}).append($("<img>").attr({"class": "materialboxed boxes", "id": "box-info", "src": "assets/images/Untitled.png"}))
                 ),
              
              $("<div>").attr({"class": "col l6"}).append(
                $("<img>").attr({"class": "materialboxed boxes", "id": "box-info", "src": "assets/images/weather-ex.jpg"})
              )
            )
          
            var newList = $("<li>").attr("id", i).append(
              //needs to add star icons still
              //<i class="material-icons" >star_border</i>The Loch Trail
              $("<div>").attr({"class": "collapsible-header tab-titles", "id": "starColor"}).append(star, heading),
              $("<div>").attr({"class": "collapsible-body"}).append(
                  containerRow,
                  $("<div>").attr({"class": "row"}).append($("<div>").attr({"class": "col l12"}).append($("<blockquote>").html(description),moreButton)),
                  $("<div>").attr({"id": "map"}),
                  //$("<button>").attr({"id": "genMap"}).html("Get Map")
                )
            )

          $("#accordian").append(newList);
          //end loop
          };
};


function dbPush(q, s) {
          // Code for handling the push
          database.ref().push({
          query: q,
          activitiesString: s,
          dateAdded: firebase.database.ServerValue.TIMESTAMP

          });
}


//************************************ */
//DOCUMENT CALLS
$(document).ready(function(){
  //initial search value on page load
    findRecAreas("Denver", "HIKING")
});

$(document).on("click", "#RecSearchButton", captureSearch);