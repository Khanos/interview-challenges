// function tht returns th timestamps of the enven entries with a specifi description
function getTimestampsByDescription(xml, description) {
    //  Write your code here
    let entries = xml.split('</description>')
    console.log('ebntries: ', entries)
    let timestamp;
    entries.forEach(el => {
      // console.log(el);
      if(el.includes(description)){
        el.split(' ').forEach(el => {
          if(el.includes('timestamp')){
            timestamp = el.replace(/"|timestamp=|>/g, '');
          }
        });
      };
    });
    console.log(timestamp)
    return [timestamp];

  }
  
  var xmlData = 
  `<?xml version="1.0" encoding="UTF-8"?>
  <log>
    <event timestamp="1614285589">
      <description>Intrusion detected</description>
    </event>
    <event timestamp="1614286432">
      <description>Intrusion ended</description>
    </event>
  </log>`;
  
  var timestamps = getTimestampsByDescription(xmlData, "Intrusion ended");
  console.log(timestamps == undefined ? timestamps : timestamps.join());