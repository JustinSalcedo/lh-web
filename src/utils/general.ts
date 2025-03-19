export const testEnvData = () => console.log(process.env.REACT_APP_TEST_DATA)

export const getServerBaseUrl = () =>
    process.env.REACT_APP_SERVER_BASE_URL ?? ''

export const getUserId = () => process.env.REACT_APP_USER_ID ?? ''
