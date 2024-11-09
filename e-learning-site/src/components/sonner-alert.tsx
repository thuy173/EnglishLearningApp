import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { clearNotification } from "@/redux/apps/message/MessageSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { useAppSelector } from "@/hooks/use-app-selector";
import { IoIosWarning } from "react-icons/io";
// import { IoClose } from "react-icons/io5";

const GlobalAlert = () => {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.messages.notification);

  useEffect(() => {
    if (message) {
      // const closeAction = {
      //   label: <IoClose />,
      //   onClick: () => dispatch(clearNotification()),
      // };
      if (type === "success") {
        toast.success(message, {
          style: {
            backgroundColor: "#E0FBE2",
            color: "#185519",
            border: "1px solid #185519",
          },
          // action: closeAction,
        });
      } else if (type === "error") {
        toast.error(message, {
          style: {
            backgroundColor: "#F8EDED",
            color: "#B8001F",
            border: "1px solid #800000",
          },
          // action: closeAction,
        });
      } else if (type === "warning") {
        toast(message, {
          style: {
            backgroundColor: "#FFF4E5",
            color: "#664d03",
            border: "1px solid #FFC107",
          },
          icon: <IoIosWarning size={22} />,
          // action: closeAction,
        });
      }

      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
  }, [message, type, dispatch]);

  return <Toaster position="bottom-left" />;
};

export default GlobalAlert;
