import { ResponseMessages } from "../../utils/httpStatusCode";

export default (dependencies: any) => {
    const { userRepository } = dependencies.repository;

    const executeFunction = async (requestData: { email: string, currentPassword: string, newPassword: string, confirmPassword: string }) => {
        try {
            const {email, currentPassword, newPassword, confirmPassword} = requestData;
            const response = await userRepository.changePassword({email, currentPassword, newPassword, confirmPassword});
            
            if(response && response.status) {
                return { status: true, message: ResponseMessages.PASSWORD_RESET_SUCCESSFULLY };
            } else  {
                return { status: false, message: response.message || ResponseMessages.FAILED_TO_CHANGE_PASSWORD }
            }
        } catch (error) {
            return { status: false, message: ResponseMessages.ERROR_IN_CHANGE_PASSWORD_USECASE };
        }
    }
    return {executeFunction}
}