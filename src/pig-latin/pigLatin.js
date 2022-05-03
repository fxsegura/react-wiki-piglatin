export function pigLatin(str) {
    //error if empty field
    if (str === "") {
      return "Error: please enter a word to translate."
    }
    
    //create arrays for tracking true vowels and punctuation
    let vowels = ["a","e","i","o","u","A","E","I","O","U","y","Y"];
    //let punc = [".","?","!",",","\"","'"];
    
    //split the sentence into an array of words
    let sentence = str.split(/(?=[!?.,])|[_-\s]/).filter(x => x);
    let result = [];
    
    //iterate through sentence array and translate each word
    for (let i = 0; i < sentence.length; i++) {
      
      //split the current word by first vowel
      let arr = sentence[i].split(/([aeiouAEIOUyY])/).filter(x => x);
      let firstLetter = "";
      
      //set switch case based on first letters
      if (/[^a-zA-Z]/.test(arr[0])) {
        firstLetter = "punc";
      } else if (/[yY]/.test(arr)) {
        firstLetter = "y";
      } else if (vowels.indexOf(arr[0]) !== -1) {
        firstLetter = "vowel";
      }
      
      //switch statement for handling different word starts
      switch (firstLetter) {
        case 'punc':
          //do nothing to avoid appending suffix to special characters
          break;
        case 'y':
         if (/[aeiouAEIOU]/.test(arr)) {
            while (vowels.indexOf(arr[0].charAt(0)) === -1) {
              arr.push(arr.shift().toLowerCase());
            }
            arr.push('ay');
          } else {
            arr.push(arr.shift().toLowerCase());
            arr.push('ay');
          }
          break;
        case 'vowel':
          if (/[yY]/.test(arr[arr.length-1])) {
            arr.push("ay");
          } else {
            arr.push("way"); 
          }
          break;
        default:
          arr.push(arr.shift().toLowerCase());
          arr.push('ay');
          break;
      }
      
      //capitalize the first letter of the sentence or any word capitalized in the entry
      if (i === 0 || sentence[i].charAt(0) === sentence[i].charAt(0).toUpperCase()) {
        arr[0] = arr[0].charAt(0).toUpperCase();
      }
      
      //output arr of strings
      result.push(arr.join(''));
    }
    
    //return final string with spaces before punctuation removed
    return result.join(" ").replace(/\s([?.!,])/gi, '$1');
  }