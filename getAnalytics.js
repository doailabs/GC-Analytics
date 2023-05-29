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

      // Process the data for each conversation
      for (let conversation of data.conversationsDetails) {
        // Add the conversation data to the conversations table
        conversationsTable.push(conversation.conversation);

        // Process the data for each participant in the conversation
        for (let participant of conversation.participants) {
          // Add the participant data to the participants table
          participantsTable.push(participant);

          // Process the data for each session in the participant
          for (let session of participant.sessions) {
            // Add the session data to the sessions table
            sessionsTable.push(session);

            // Process the data for each segment in the session
            for (let segment of session.segments) {
              // Add the segment data to the segments table
              segmentsTable.push(segment);
            }
          }

          // Process the data for each metric in the participant
          for (let metric of participant.metrics) {
            // Add the metric data to the metrics table
            metricsTable.push(metric);
          }
        }
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
      console.log("There was a failure calling postAnalyticsConversationsDetailsQuery");
      console.error(err);
    });
}
