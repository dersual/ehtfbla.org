!(function ($) {
  "use strict";
  var members = [];
  var freshmen, sophmores, juniors, seniors;

   function initializeGAPI() {
    gapi.load("client", async () => {
      //change api key to be from diff account
      let apiKey = "AIzaSyCd93SREQCuW1PfUTpwpyybu8hAEZk-LLs";
      await gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      });
      await callSpreadSheetAPI();
    });
  }

  async function callSpreadSheetAPI() {
    let sheetID = "1kOSRU_SbvowQqeJMk6YxbAYEg5OOuxl-jl7fb12fb90";
    const response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: sheetID,
      range: "Sheet1!A2:D91", // Adjust the range based on amount of members
    });

    const values = response.result.values; 
    formatListOfValues(values)
  }
  function formatListOfValues(list) {
    for (let i = 0; i < list.length; i++) {
      let individual = list[i];
      let member = {};
      member.name = `${individual[0]} ${individual[1]}`;
      member.grade = Number(individual[2]);
      member.hours = Number(individual[3]);
      members.push(member);
    }
    freshmen = members.filter((member) => member.grade === 9);
    sophmores = members.filter((member) => member.grade === 10);
    juniors = members.filter((member) => member.grade === 11);
    seniors = members.filter((member) => member.grade === 12); 
    createRows([freshmen, sophmores, juniors, seniors])
  }

  function createRows(members_formatted) {
    var grades = ["freshmen", "sophmore", "junior", "senior"];
    var template = $(".template_table_row").html();
    for (var i = 0; i < grades.length; i++) {
      var parent_id = "#" + grades[i] + "_tbody";
      for (var k = 0; k < members_formatted[i].length; k++) {
        var row = $(template).clone();
        row.find("th").text(k + 1);
        row.find(".name").text(members_formatted[i][k].name);
        row.find(".grade").text(members_formatted[i][k].grade);
        row.find(".hours").text(members_formatted[i][k].hours);
        $(parent_id).append(row);
      }
    }
  } 

  initializeGAPI()
})(jQuery);
