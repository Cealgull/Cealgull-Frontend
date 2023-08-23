import { createServer } from "miragejs";
import APIUri from "../api_uri.json";

const sampleCert =
  "-----BEGIN CERTIFICATE-----\nMIIBezCCAS2gAwIBAgJBAME6CH6ihc3o2w9kC9yX8br7wgnlhm0ZjH1kPrnG9DCm\nDJkm9UR5Z6ciyvjuQQTeSN/wQ/SdPlJm4aiYh81uzfswBQYDK2VwMFsxCzAJBgNV\nBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX\naWRnaXRzIFB0eSBMdGQxFDASBgNVBAMMC2NvbW1vbiBuYW1lMB4XDTIzMDcxMzA3\nMDAyNloXDTMzMDcxMDA3MDAyNlowLjERMA8GA1UEChMIQ2VhbGd1bGwxGTAXBgNV\nBAsTEENlYWxndWxsIFByb2plY3QwCjAFBgMrZXADAQCjIzAhMB8GA1UdIwQYMBaA\nFKpxV3rhlqRX5kUmv6X8sDx3NMO9MAUGAytlcANBABIHSSJfI1FN+uk4+HjNCrz9\ngn8ZqVzZ4VkwHaix8P37HrW0MG4FdunI1jgCvxtWdUPHd5+NP7D5CBJcusQVhgM=\n-----END CERTIFICATE-----\n";

export function startAuthServer() {
  return createServer({
    urlPrefix: process.env["AUTH_API"],
    environment: "test",
    routes() {
      this.post(APIUri["auth.email.query"], () => ({
        code: 200,
        message: "ok",
      }));
      this.post(APIUri["auth.email.verify"], () => ({}));
      this.post(APIUri["auth.cert.query"], (_schema, request) => {
        if (request.requestHeaders["signature"] === "hack") {
          return {
            cert: sampleCert,
          };
        }
        return {};
      });
    },
  });
}

export function startForumServer() {
  return createServer({
    urlPrefix: process.env["FORUM_API"],
    environment: "test",
    routes() {
      this.post(APIUri["user.login"], () => ({}));
    },
  });
}
