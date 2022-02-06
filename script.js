const ansList = [];
var steps = 0;


function Submit() {
  //array of errors
  const errors = [];


  // Selecting the input elements and get values 
  var binaryVal = document.getElementById("binary");
  var decimalVal = document.getElementById("decimal");
  var stepByStepVal = document.getElementById("stepByStep");
  var allStepsVal = document.getElementById("allSteps");
  var divisorStr = document.getElementById("floatingDivisor").value;
  var divisorInt;
  var dividendInt;
  var dividendStr = document.getElementById("floatingDividend").value;
  var errorBox = document.getElementById("error_msg");

  var regexTest = /[01\-+]$/
  

  //error validation
    divisorInt = parseInt(divisorStr);
    dividendInt = parseInt(dividendStr);
  
  // Dividend Validation - General

  //TODO: Implement Firefox compatibility
  //Firefox has an unresolved bug that allows users to input text on numerical fields, so we need to place a check for that
  if (dividendStr == "" || dividendStr == null) {
    errors.push("Dividend: Null is not a valid input.")
  }

  // Dividend Validation - Binary

  if (binaryVal.checked) {
    if (!(isNaN(dividendInt))) {
      if (!regexTest.test(dividendStr)) {
        errors.push("Dividend: Binary inputs can only contain 0s and 1s");
      } else if (dividendInt < 0) {
        errors.push("Dividend: Values for binary inputs cannot be negative.");
      } else if (dividendStr.length > 16) {
        errors.push("Dividend: Binary value above maximum range");
      }
    }
  }

  // Dividend Validation - Decimal

  if (decimalVal.checked) {
    if (!isNaN(dividendInt) && (dividendInt > 65535 || dividendInt < 0)){
      errors.push("Dividend: Value is not within the given range for decimal inputs (0 - 65535).")
    }
  }

  // Divisor Validation - General
  //TODO: Implement Firefox compatibility
  //Firefox has an unresolved bug that allows users to input text on numerical fields, so we need to place a check for that
  if (divisorInt == 0 && !isNaN(divisorInt)) {
    errors.push("Divisor: Value cannot be 0");
  }

  if (divisorStr == "" || divisorStr == null) {
    errors.push("Divisor: Null is not a valid input.");
  }

  // Divisor Validation - Binary

  if (binaryVal.checked) {
    if (!isNaN(divisorInt)) {
      if (!regexTest.test(divisorStr)) {
        console.log(divisorStr);
        errors.push("Divisor: Binary inputs can only contain 0s and 1s");
      } else if (divisorInt < 0) {
        errors.push("Divisor: Values for binary inputs cannot be negative.");
      }
      else if (divisorStr.length > 16) {
        errors.push("Divisor: Binary value above maximum range");
      }
    }
  }

  // Dividend Validation - Decimal

  if (decimalVal.checked) {
    if (!isNaN(divisorInt) && (divisorInt > 65535 || divisorInt < 0)) {
      errors.push("Dividend: Value is not within the given range for decimal inputs (0 - 65535).")
    }
  }

  //if no errors
  if (errors.length == 0) {
    errorBox.innerHTML = "";
    
    var submit = document.getElementById("submit");
    var a = document.getElementById("floatingDivisor");
    var b = document.getElementById("floatingDividend");

    submit.disabled = true;
    binaryVal.disabled = true;
    decimalVal.disabled = true;
    stepByStepVal.disabled = true;
    allStepsVal.disabled = true;
    a.disabled = true;
    b.disabled = true;

    
    
    
    if (decimalVal.checked) {
      dividendStr = dividendInt.toString(2);
      divisorStr = divisorInt.toString(2);
    }
    

    function Division(Q, M) {
      //const ansList = [];
      
      var A = "";
      var P = "";

      var lenM = M.length;
      var lenQ = Q.length;
      var lenA = 0;

      steps = lenQ;

      if (lenM > lenQ) {
        lenA = lenM + 1;
      }
      else {
        lenA = lenQ + 1;
      }

      for (var i = 0; i < lenA; i++) {
        A = A + "0";
      }
      for (var i = lenM; i < lenA; i++) {
        M = "0" + M;
      }

      var len = lenA;
      //neg value of M
      var i = 0;
      while (len > 0) {
        if (i == 0) {
          if (M.charAt(len - 1) == '1') {
            i = 1;
          }
          //copy num
          P = M.charAt(len - 1) + P;
        }
        else {
          if (M.charAt(len - 1) == '1') {
            //copy 0
            P = "0" + P;
          }
          else {
            //copy 1
            P = "1" + P;
          }
        }
        len--;
      }

    var aVal = document.getElementById("a");
    var qVal = document.getElementById("q");
    var mVal = document.getElementById("m");
    var nmVal = document.getElementById("nm");
    aVal.innerHTML = A;
    qVal.innerHTML = Q;
    mVal.innerHTML = M;
    nmVal.innerHTML = P;
    var res = document.getElementById("result");
    res.style.display = "block";

      //console.log("A:",A);
      //console.log("P:",P);

      function Addition(A, M) {
      var ans = "";
      var digitSum = 0;
      var lenA = A.length;
      var lenM = M.length;

      //console.log("M:", M);
      while (lenA > 0 || lenM > 0 || digitSum == 1) {
        digitSum += ((lenA > 0) ? A.charAt(lenA - 1) - '0' : 0);
        digitSum += ((lenM > 0) ? M.charAt(lenM - 1) - '0' : 0);

        ans = (digitSum % 2).toString() + ans;

        digitSum = Math.floor(digitSum / 2);
        //if di gumana, use Math.floor

        lenA--;
        lenM--;

        //console.log("ans:", ans);
      }
      if (A.length < ans.length) {
        ans = ans.substring(1, ans.length);
      }
      return ans;

    }

      //perform division
      
      var cnt = lenQ;
      while (cnt > 0) {
        if (A.charAt(0) == '1') {
          A = A.substring(1, A.length) + Q.charAt(0);
          //console.log("A:",A);
          A = Addition(A, M);
          if (A.charAt(0) == '1') {
            Q = Q.substring(1, lenQ) + "0";
          }
          else {
            Q = Q.substring(1, lenQ) + "1";
          }
        }
        else {
          A = A.substring(1, A.length) + Q.charAt(0);
          //console.log("A:",A);
          A = Addition(A, P);
          if (A.charAt(0) == '1') {
            Q = Q.substring(1, lenQ) + "0";
          }
          else {
            Q = Q.substring(1, lenQ) + "1";
          }
        }

        //console.log("A:",A);
        //console.log("Q:", Q);
        ansList.push(A);
        ansList.push(Q);

        cnt--;

      }

      if (A.charAt(0) == '1') {
        //console.log("Final A:",A);
        A = Addition(A, M);
        ansList[(ansList.length) - 2] = A;
        //console.log("A after:",A);
      }

      
      //return ansList;
    }

    
    Division(dividendStr, divisorStr);
    /*for (var i = 0; i < ansList.length; i++) {
        console.log("AnsList:", ansList[i]);
      }*/

    if (allStepsVal.checked) {
        for (var i=0; i < steps; i++) {
          nextStep();
        }
    }
    var res = document.getElementById("result");
    res.style.display = "block";
    
  }

  else {
    // return errors;
    
    
    var text = ""; // Using double quotes
    
    //print error statements
    for (let i = 0; i < errors.length; i++) {
        text += errors[i] + "<br>";
    }

    errorBox.innerHTML = text;

  }

}

function msg(){  
    document.getElementById("error_msg").innerHTML = "Hi";
}  

var counter = 0;
var ctr = 1;

function nextStep(){

  //var a = document.getElementById("a");
  //var q = document.getElementById("q");
  //var m = document.getElementById("m");
  //var nm = document.getElementById("nm");


  
  var table = document.getElementById("aqtable");
  //var i = parseInt(document.getElementById("iteration-num").value);
  var row = table.insertRow(ctr-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
//   cell1.innerHTML = ansList[i-1];
//   cell2.innerHTML = ansList[i-1];

  cell1.innerHTML = "Iteration " + (ctr);
  cell1.style.fontWeight = "700";
  cell1.style.backgroundColor = "yellow";   
  cell1.style.fontSize = "x-large"; 
  //document.getElementById("iteration-num").value = i + 1;
  ctr++;

  cell2.innerHTML = "A";
  cell2.style.fontWeight = "900";
  cell2.style.fontSize = "x-large"; 
  cell2.style.backgroundColor = "#99ebff";    
  
  cell3.innerHTML = ansList[counter];
  cell3.style.fontSize = "large"; 
  cell3.style.backgroundColor = "#99ebff";

  counter++;

  cell4.innerHTML = "Q";
  cell4.style.fontWeight = "900";
  cell4.style.fontSize = "x-large"; 
  cell4.style.backgroundColor = "#b3ffd9";  

  cell5.innerHTML = ansList[counter];
  cell5.style.fontSize = "large"; 
  cell5.style.backgroundColor = "#b3ffd9"; 

  counter++;

  var step_btn = document.getElementById("Step");
  var again_btn = document.getElementById("Again");
  var txt_btn = document.getElementById("textfile");
  if (ctr <= steps) {
    step_btn.innerHTML = "NEXT STEP";
  }
  else {
    step_btn.style.display = "none";
    again_btn.style.visibility = "visible";
    txt_btn.style.visibility = "visible";
  }
  
}

function inputAgain() {
    // var submit = document.getElementById("submit");
    // var binaryVal = document.getElementById("binary");
    // var decimalVal = document.getElementById("decimal");
    // var stepByStepVal = document.getElementById("stepByStep");
    // var allStepsVal = document.getElementById("allSteps");
    // var divisorStr = '' + document.getElementById("floatingDivisor").value;
    // var dividendStr = '' + document.getElementById("floatingDividend").value;
    // var a = document.getElementById("floatingDivisor");
    // var b = document.getElementById("floatingDividend");

    
    // submit.disabled = false;
    // binaryVal.disabled = false;
    // decimalVal.disabled = false;
    // stepByStepVal.disabled = false;
    // allStepsVal.disabled = false;
    // a.disabled = false;
    // b.disabled = false;


    // divisorStr.value = '';
    // dividendStr.value = '';
    // again_btn.style.visibility = "hidden";

    
    location.reload();
}

function textFile(){
  const data = [];
  var j = 1;
  for (var i=0; i < ansList.length-1; i++) {
      data.push('Iteration ' + j + ' ----- ' + 'A: ' + ansList[i] + ' Q: ' + ansList[i+1] + '\n');
      j++;
      i++;
  }

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'nrDiv.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
  }

  newLink.click(); 
}


// binary mode crashes with negative input