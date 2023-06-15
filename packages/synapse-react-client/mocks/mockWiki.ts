import { WikiPage } from '@sage-bionetworks/synapse-types'
import { MOCK_USER_ID, MOCK_USER_ID_2 } from './user/mock_user_profile'

const mockWikiMarkdown =
  '**You have access to these data under the following terms:**\n\nAccess to these data is controlled at the request of the data contributor(s) and due to the sensitive nature of the data. The terms for data access cannot be modified. \n&nbsp;\nClick the **Request Access** button below to start your application, where you will be prompted to enter:\n1.\tA brief Intended Data Use statement to be posted on the AD Knowledge Portal (500 words maximum in English). The Intended Data Use statement must include the following:\n     * **The names of the AD Knowledge Portal studies from which you plan to access data.** A full list of study names can be found **[here](https://adknowledgeportal.synapse.org/Explore/Studies)**.\n     * Objectives of the proposed research\n     * Study design and analysis plan\n2.\tList the Synapse username of all collaborators from your institution who will be accessing the data. \n3.\tSubmit the embedded [Data Use Certificate (DUC)](https://www.synapse.org/#!Synapse:syn25441378) signed by yourself, your institutional signing official, and all collaborating investigators from your institution who will be accessing the data\n\n&nbsp;\nFor annual renewal or to add an investigator to an existing DUC, please see the instructions provided on the [AD Portal Docs](https://help.adknowledgeportal.org/apd/Data-Use-Certificates.2623373330.html) help page.\n\nExpected data access application review time is one to two weeks.  Once approved, data may be used for one year.  You must submit a renewal at the conclusion of one year, otherwise your access will be revoked.\n\n**Please note that it is a violation of the Data Access Terms and Conditions to share Individual-level Human data and/or results outside of the AD Knowledge Portal**. This is true for files obtained directly from the AD Knowledge Portal and/or generated through your own analysis. Also, proper acknowledgment of data sources is mandatory in publications based on secondary data use.  See the [Data Use and Acknowledgement ](https://help.adknowledgeportal.org/apd/Data-Use-&-Acknowledgement.2623242281.html) instructions for more information.\n\n&nbsp;\nIf you have questions about the data access process, please contact the Synapse Access & Compliance Team by submitting your question to the [Access and Compliance Team Help Center Portal](https://sagebionetworks.jira.com/servicedesk/customer/portal/8) or by emailing the team at act@sagebionetworks.org.  \n'

export const mockManagedACTAccessRequirementWikiPage: WikiPage = {
  id: '123',
  etag: '00924558-f46d-4f05-9f62-0686ddecf8ed',
  createdOn: '2017-08-23T18:48:37.515Z',
  createdBy: MOCK_USER_ID.toString(),
  modifiedOn: '2022-12-06T23:18:27.877Z',
  modifiedBy: MOCK_USER_ID_2.toString(),
  title: '',
  markdown: mockWikiMarkdown,
  attachmentFileHandleIds: [],
}

export const mockSelfSignAccessRequirementWikiPage: WikiPage = {
  id: '124',
  etag: '00924558-f46d-4f05-9f62-0686ddecf8ed',
  createdOn: '2017-08-23T18:48:37.515Z',
  createdBy: MOCK_USER_ID.toString(),
  modifiedOn: '2022-12-06T23:18:27.877Z',
  modifiedBy: MOCK_USER_ID_2.toString(),
  title: '',
  markdown:
    'You must accept the terms of this self-sign access requirement. The terms are described here, and you sign it yourself.',
  attachmentFileHandleIds: [],
}

export const mockWikiPages: WikiPage[] = [
  mockManagedACTAccessRequirementWikiPage,
  mockSelfSignAccessRequirementWikiPage,
]
