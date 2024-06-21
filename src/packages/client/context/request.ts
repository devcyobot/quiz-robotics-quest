import { SubmitResult, UserCredentials } from "./types";

export const request = async (
  user: UserCredentials | null,
  endPoint = "",
  method: string
): Promise<SubmitResult> => {
  try {
    let res;
    res = await fetch(`/api/${endPoint}`, {
      method: `${method}`,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const parsedResponse = await res.json();

    if (parsedResponse.errors) {
      if (parsedResponse.errors[0].data) {
        console.log("New Errors: ", parsedResponse.errors[0].data[0].message);
        return {
          success: false,
          //   data: null,
          message: parsedResponse.errors[0].data[0].message,
        };
      }
      return {
        success: false,
        // data: null,
        message: parsedResponse.errors[0].message,
      };
    }

    if (res.ok) {
      return {
        success: true,
        // data: null,
        message: parsedResponse.message,
      };
    }

    return { success: false, message: parsedResponse.message };
    // throw new Error("Unexpected response format");
  } catch (error) {
    throw new Error(error as string);
  }
};
