import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { AccountView } from "../AccountView";
import { Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";

const mockedNavigate = jest.fn();
const mockedPop = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      pop: mockedPop,
    }),
  };
});

jest.mock("@src/hooks/useImagePicker", () => {
  return jest.fn().mockImplementation(() => {
    return async () => {
      return [
        {
          uri: "mocked-uri",
          base64: "mocked-base64",
        },
      ];
    };
  });
});

describe("Account View Test", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  test("Account render test", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
  });
  test("Account press test1", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const nameModify = screen.getByTestId("nameModify");

    fireEvent.press(nameModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const input = screen.getByTestId("dialogInput");
    fireEvent.changeText(input, "Test");
    const dialogCancel = screen.getByTestId("dialogCancel");
    fireEvent.press(dialogCancel);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const accountViewPop = screen.getByTestId("accountViewPop");
    fireEvent.press(accountViewPop);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });
  test("Account press test2", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const signatureModify = screen.getByTestId("signatureModify");

    fireEvent.press(signatureModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const dialogCancel = screen.getByTestId("dialogCancel");
    fireEvent.press(dialogCancel);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test3", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const avatarModify = screen.getByTestId("avatarModify");

    fireEvent.press(avatarModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const dialogCancel = screen.getByTestId("dialogCancel");
    fireEvent.press(dialogCancel);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test4", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const logout = screen.getByTestId("logout");

    fireEvent.press(logout);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test5", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const nameModify = screen.getByTestId("nameModify");

    fireEvent.press(nameModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const input = screen.getByTestId("dialogInput");
    fireEvent.changeText(input, "Test");
    const dialogOk = screen.getByTestId("dialogOk");
    fireEvent.press(dialogOk);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test6", async () => {
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const signatureModify = screen.getByTestId("signatureModify");

    fireEvent.press(signatureModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const input = screen.getByTestId("dialogInput");
    fireEvent.changeText(input, "Test");
    const dialogOk = screen.getByTestId("dialogOk");
    fireEvent.press(dialogOk);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test7", async () => {
    jest.mock("@src/hooks/useImagePicker", () => {
      return jest.fn().mockImplementation(() => {
        return async () => {
          return [
            {
              uri: "mocked-uri",
              base64: "mocked-base64",
            },
          ];
        };
      });
    });
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const avatarModify = screen.getByTestId("avatarModify");

    fireEvent.press(avatarModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const avatarPicker = screen.getByTestId("avatarPicker");
    fireEvent.press(avatarPicker);
    const dialogOk = screen.getByTestId("dialogOk");
    fireEvent.press(dialogOk);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });

  test("Account press test8", async () => {
    jest.mock("@src/hooks/useImagePicker", () => {
      return jest.fn().mockImplementation(() => {
        return async () => {
          return null;
        };
      });
    });
    render(
      <AccountView
        wallet="Test"
        userName="Test"
        userAvatar="Test"
        userSignature="Test"
      />
    );
    const avatarModify = screen.getByTestId("avatarModify");

    fireEvent.press(avatarModify);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
    const avatarPicker = screen.getByTestId("avatarPicker");
    fireEvent.press(avatarPicker);
    const dialogOk = screen.getByTestId("dialogOk");
    fireEvent.press(dialogOk);
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    });
  });
});
