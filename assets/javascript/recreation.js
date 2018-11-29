
//GLOBAL VARIABLES
var searchDate = "";

//FUNCTIONS

function captureSearch() {
          //FUNCTION to capture search values and either pass to other APIs or save as local values
          var search2 = $("#search2").val().trim();
          searchDate = $("#searchDate").val().trim();

          //Activites need to be combined into a single variable
          var activities = [];
          if ($("#hiking-checkbox").prop('checked') == true) {
            activities.push($("#hiking-checkbox").val().trim());
          }
          if ($("#biking-checkbox").prop('checked') == true) {
            activities.push($("#biking-checkbox").val().trim());
          }
          if ($("#camping-checkbox").prop('checked') == true) {
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
    
          console.log(search2);
          console.log(searchDate);
          console.log(activitiesString);
          
};

function findRecAreas() {
          //addtional notes
          //FacilityTypeDescription: "Facility" is a generic description that seems to apply to everything BUT "Campgrounds"
          //Example Lat and Long 39.994118, -105.633991
          //FacilityLatitude: 39.994118 
          //FacilityLongitude: -105.633991

          //ie campsites, facilities (ie places, also allows for a query= search), and recareas
          var method = "facilities";
          //***QUERY option is ONLY valid for facilities endPoint
          //query input from user
          var queryInput = "Boulder";
          var query = "query=" +queryInput +"&";
          var limit = 10;
          var offset = 0;
          var state = "CO";
          //activities are comma seperated and you can either use the activity name or it's ID.
          //Biking = 5, Camping = 9, Hiking = 14
          var activities = "HIKING,BIKING";
          var apikey = "0bde3bb5-6af0-4171-8311-755a6fb73015";
          var queryURL = "https://ridb.recreation.gov/api/v1/" + method +"?" +query +"limit=" + limit +"&offset=" +offset +"&state=" +state +"&activity=" +activities +"&apikey=" +apikey;
          console.log(queryURL);

          var settings = {
            "url": queryURL,
            "method": "GET"
          };
          
    $.ajax(settings).done(function (response) {
      recAreas = response.RECDATA;
      console.log(recAreas);
    });
       
};
    //Now call the API
    findRecAreas();

//DOCUMENT CALLS

$(document).on("click", "#RecSearchButton", captureSearch);