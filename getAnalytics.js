function getAnalytics(startDate, endDate, groupByField, platformClient) {
  let apiInstance = new platformClient.ConversationsApi();
  
  let interval = `${startDate}/${endDate}`;
  let opts = {
    'interval': interval,
    'groupBy': [groupByField],
    'order': 'asc',
    'orderBy': groupByField
  };

  return apiInstance.postAnalyticsConversationsDetailsQuery(opts)
    .then((data) => {
      let groupedData = groupData(data.conversations, groupByField);
      return groupedData;
    })
    .catch((err) => {
      console.log('Error calling postAnalyticsConversationsDetailsQuery:', err);
    });
}

function groupData(conversations, groupByField) {
  let groupedConversations = {};

  conversations.forEach((conversation) => {
    let groupFieldValue = conversation[groupByField];

    if (!groupedConversations[groupFieldValue]) {
      groupedConversations[groupFieldValue] = [];
    }

    groupedConversations[groupFieldValue].push(conversation);
  });

  return groupedConversations;
}
