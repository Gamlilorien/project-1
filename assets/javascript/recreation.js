
//VARIABLES


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
          
          //FIRST - remove previous results (if any)
          $("#accordian").html("");
          
          //disabled for now to simply hard code for first 10 results
          // var arrayCount = recAreas.length;
          console.log(length);
          for (var i = 0; i < 10; i++) {
            
            var name = recAreas[i].FacilityName;
            var description = recAreas[i].FacilityDescription;
            //For type, campgrounds are simply Campground, where as Facility is for everyting else...
            var type = recAreas[i].FacilityTypeDescription;
            
            //don't need these yet so disabled for now
            // var facilityID = recAreas[i].FacilityID;
            // var latitude = recAreas[i].FacilityLatitude;
            // var longitude = recAreas[i].FacilityLongitude;

            var newList = $("<li>").attr("id", i).append(
              $("<div>").attr({"class": "collapsible-header"}).html(name),
              $("<div>").attr({"class": "collapsible-body"}).html(description)
            )

          $("#accordian").append(newList);
          //end loop
          };
};


//DOCUMENT CALLS
$(document).ready(function(){
  //initial search value on page load
    findRecAreas("Denver", "HIKING")
});

$(document).on("click", "#RecSearchButton", captureSearch);