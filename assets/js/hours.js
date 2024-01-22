let members = [];
let freshmen, sophmores, juniors, seniors;

//initializeGAPI()

function initializeGAPI() {
  gapi.load("client", async () => {
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
    range: "Sheet1!A2:D89", // Adjust the range based on your needs
  });

  const values = response.result.values;
  formatListOfValues(values);
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
  console.log(members);
  freshmen = members.filter((member) => member.grade === 9);
  sophmores = members.filter((member) => member.grade === 10);
  juniors = members.filter((member) => member.grade === 11);
  seniors = members.filter((member) => member.grade === 12);
}
!(function ($) {
  "use strict"; 
  
})(jQuery);
