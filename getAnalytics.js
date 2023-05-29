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
    })
    .catch((err) => {
      // Log the error message if the request failed
      console.log("There was a failure calling postAnalyticsConversationsDetailsQuery");
      console.error(err);
    });
}
