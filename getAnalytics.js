function getAnalytics(startDate, endDate) {
  // Require the platform client
  const platformClient = require('platformClient');

  // Create a new instance of the Conversations API
  let apiInstance = new platformClient.ConversationsApi();

  // Define the body of the request
  let body = {
    "interval": `${startDate}/${endDate}`
  };

  // Call the postAnalyticsConversationsDetailsQuery method on the API instance
  apiInstance.postAnalyticsConversationsDetailsQuery(body)
    .then((data) => {
      // Log the success message if the request was successful
      console.log(`postAnalyticsConversationsDetailsQuery success! data: ${JSON.stringify(data, null, 2)}`);

      // Initialize the tables
      let conversationsTable = [];
      let participantsTable = [];
      let sessionsTable = [];
      let segmentsTable = [];
      let metricsTable = [];

      // Check if data.conversations is iterable
      if (data.conversations && typeof data.conversations[Symbol.iterator] === 'function') {
        // Process the data for each conversation
        for (let conversation of data.conversations) {
          // Add the conversation data to the conversations table
          conversationsTable.push(conversation);

          // Check if conversation.participants is iterable
          if (conversation.participants && typeof conversation.participants[Symbol.iterator] === 'function') {
            // Process the data for each participant in the conversation
            for (let participant of conversation.participants) {
              // Add the participant data to the participants table
              participantsTable.push(participant);

              // Check if participant.sessions is iterable
              if (participant.sessions && typeof participant.sessions[Symbol.iterator] === 'function') {
                // Process the data for each session in the participant
                for (let session of participant.sessions) {
                  // Add the session data to the sessions table
                  sessionsTable.push(session);

                  // Check if session.segments is iterable
                  if (session.segments && typeof session.segments[Symbol.iterator] === 'function') {
                    // Process the data for each segment in the session
                    for (let segment of session.segments) {
                      // Add the segment data to the segments table
                      segmentsTable.push(segment);
                    }
                  } else {
                    console.error("session.segments is not iterable");
                  }
                }
              } else {
                console.error("participant.sessions is not iterable");
              }

              // Check if participant.metrics is iterable
              if (participant.metrics && typeof participant.metrics[Symbol.iterator] === 'function') {
                // Process the data for each metric in the participant
                for (let metric of participant.metrics) {
                  // Add the metric data to the metrics table
                  metricsTable.push(metric);
                }
              } else {
                console.error("participant.metrics is not iterable");
              }
            }
          } else {
            console.error("conversation.participants is not iterable");
          }
        }
      } else {
        console.error("data.conversations is not iterable");
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
