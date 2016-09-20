/*
 * Convert OpenKIM edn json to conventional json.
 */

Result = _ "[" _ instances:(Instance _)* "]" _ {
  var result = [];
  for (var i = 0; i < instances.length; i++) {
    result.push(instances[i][0]);
  }
  return result;
}

Instance = "{" _ items:(Item _)* "}" {
  var result = {};
  for (var i = 0; i < items.length; i++) {
    var item = items[i][0];
    result[item.name] = item.value;
  }
  return result;
}

Item = "\"" identifier:Identifier "\"" _ value:Value {
  return {
    name: identifier,
    value: value
  };
}

Identifier = [a-zA-Z0-9\-]* {
  return text();
}

Value = value:(ValueObject / ArrayValue / StringValue / NumberValue) {
  return value;
}

StringValue = "\"" string:([^\"]+) "\"" {
  return string.join("");
}

NumberValue = number:(ScientificNotation / Decimal / Integer) {
  return number;
}

Decimal = Integer "." Integer {
  return parseFloat(text());
}

ScientificNotation = Decimal "e" Integer {
  return parseFloat(text());
}

ArrayValue = "["  _ values:(Value _)* "]" {
  var result = [];
  for (var i = 0; i < values.length; i++) {
    result.push(values[i][0]);
  }
  return result;
}

ValueObject = "{" _ items:(Item _)* "}" {
  var result = {};
  for (var i = 0; i < items.length; i++) {
    var item = items[i][0];
    result[item.name] = item.value;
  }
  return result;
}

Integer "integer"
  = [\-]?[0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
