XStrings = new Mongo.Collection("xstrings");
YStrings = new Mongo.Collection("ystrings");
Keys = new Mongo.Collection("keys");

if (Meteor.isClient) {
  Template.addX.events({
    "submit .new-x": function (event) {
      event.preventDefault();
      var input = event.target.xin.value;
      input = toUniqueCharArray(input);
      var thisKey = Keys.find({name: "x"}).fetch()[0].value; 
      alert(thisKey);
      XStrings.insert({
        xKey: thisKey,
        letters: input,
      });
      Keys.update({name: "x"},{$set: {value: thisKey + 1}});
      event.target.xin.value = "";
    }
  });

  Template.addY.events({
    "submit .new-y": function (event) {
      event.preventDefault();
      var input = event.target.yin.value;
      input = toUniqueCharArray(input);
      var thiskey = Keys.find({name: "y"}).fetch()[1];

      YStrings.insert({
        yKey: thisket,
        letters: toUniqueCharArray(input)
      });

      Keys.update({name: "y"},{$set: {value: thisKey +1}});
      event.target.yin.value = "";
    } 
  });


  function toUniqueCharArray(input) {
    var charArray = input.toLowerCase().split('');
    var hasLetter = new Array(26);
    for(var i = 0; i < hasLetter.length; i++) {
      hasLetter[i] = 0;
    }
    for(var i = 0; i < charArray.length; i++) {
      if(charArray[i] >= 'a' && charArray[i] <= 'z') {
        hasLetter[charArray[i].charCodeAt() - 'a'.charCodeAt()] = 1;
      }
    }
    return hasLetter;
  }

  function scoreCalc(arr1, arr2) {
    var score = 0;
    for(var i = 0; i < 26; i++) {
      if(arr1[i] == arr2[i])
        score++;
    }
  }

  Template.display.helpers({
    xouts: function() 
    {
      return XStrings.find({});
    },
    youts: function() 
    {
      return YStrings.find({});
    },
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if(Keys.find().count() === 0) {
      Keys.insert ({
        name: "x",
        value: 0
      });
      Keys.insert ({
        name: "y",
        value: 0
      });
    }
  });

}
