function getAnalytics(startDate, endDate) {
  // Require the platform client
  const platformClient = require('platformClient');

  // Create a new instance of the Conversations API
  let apiInstance = new platformClient.ConversationsApi();

  // Define the body of the request
  let body = {
    "interval": `${startDate}/${endDate}`
  };

  // Return the promise
  return apiInstance.postAnalyticsConversationsDetailsQuery(body)
    .then((data) => {
      // Log the success message if the request was successful
      console.log(`postAnalyticsConversationsDetailsQuery success! data: ${JSON.stringify(data, null, 2)}`);
          
      // Initialize the tables
      let conversationsTable = [];
      let participantsTable = [];
      let sessionsTable = [];
      let segmentsTable = [];
      let metricsTable = [];

      // conversationId links the conversations and participants tables
      // participantId links the participants and sessions tables
      // sessionId links the sessions, segments, and metrics tables
    
      // Check if data.conversations is iterable and an array
      if (data.conversations && Array.isArray(data.conversations)) {
        // Process the data for each conversation
        for (let conversation of data.conversations) {
          // Add the conversation data to the conversations table
          conversationsTable.push(conversation);

          // Check if conversation.participants is iterable and an array
          if (conversation.participants && Array.isArray(conversation.participants)) {
            // Process the data for each participant in the conversation
            for (let participant of conversation.participants) {
              // Add the conversationId to the participant data
              participant.conversationId = conversation.conversationId;

              // Add the participant data to the participants table
              participantsTable.push(participant);

              // Check if participant.sessions is iterable and an array
              if (participant.sessions && Array.isArray(participant.sessions)) {
                // Process the data for each session in the participant
                for (let session of participant.sessions) {
                  // Add the participantId to the session data
                  session.participantId = participant.participantId;

                  // Add the session data to the sessions table
                  sessionsTable.push(session);

                  // Check if session.segments is iterable and an array
                  if (session.segments && Array.isArray(session.segments)) {
                    // Process the data for each segment in the session
                    for (let segment of session.segments) {
                      // Add the sessionId to the segment data
                      segment.sessionId = session.sessionId;

                      // Add the segment data to the segments table
                      segmentsTable.push(segment);
                    }
                  } else {
                    console.warn("Warning: session.segments is not iterable or is not an array. Skipping.");
                  }
                }
              } else {
                console.warn("Warning: participant.sessions is not iterable or is not an array. Skipping.");
              }

              // Check if participant.metrics is iterable and an array
              if (participant.metrics && Array.isArray(participant.metrics)) {
                // Process the data for each metric in the participant
                for (let metric of participant.metrics) {
                  // Add the participantId to the metric data
                  metric.participantId = participant.participantId;
                  // Change the structure of metrics data
                  let metricData = {};
                  metricData[metric.name] = metric.value;
                  metricData.participantId = participant.participantId;
                  // Add the metric data to the metrics table
                  metricsTable.push(metricData);
                }
              } else {
                console.warn("Warning: participant.metrics is not iterable or is not an array. Skipping.");
              }
            }
          } else {
            console.warn("Warning: conversation.participants is not iterable or is not an array. Skipping.");
          }
        }
      } else {
        console.warn("Warning: data.conversations is not iterable or is not an array. Skipping.");
      }
      // Return the tables
      return {
        'conversations': conversationsTable,
        'participants': participantsTable,
        'sessions': sessionsTable,
        'segments': segmentsTable,
        'metrics': metricsTable
      };
    })
    .catch((err) => {
      // Log the error message if the request failed
      console.log("There was a failure calling postAnalyticsConversationsDetailsQuery. Details:");
      console.error(`Error message: ${err.message}`);
      console.error(`Error status: ${err.status}`);
    });
}
function getColumnNames(tables) {
  let columnNames = new Set();
  
  // Check each table
  for (let tableName in tables) {
    if (Array.isArray(tables[tableName])) {
      // Check each row in the table
      for (let row of tables[tableName]) {
        // Check each key in the row
        for (let key in row) {
          columnNames.add(key);
        }
      }
    }
  }
  return Array.from(columnNames);
}

