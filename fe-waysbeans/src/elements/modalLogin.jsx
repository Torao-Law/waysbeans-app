import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import useLogin from "../hooks/useLogin";

const ModalLogin = ({ showModal, closeModal, loginModal }) => {
  const { handleChanges, handleSubmit } = useLogin();

  return (
    <Dialog
      size="xs"
      open={showModal}
      handler={closeModal}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h3" color="green" className="text-center py-3">
            Sign In
          </Typography>
          <Input
            name="email"
            label="Email"
            size="lg"
            color="green"
            onChange={handleChanges}
            id="email"
          />
          <Input
            name="password"
            label="Password"
            size="lg"
            color="green"
            onChange={handleChanges}
            id="password"
          />
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            onClick={() => {
              handleSubmit();
              closeModal();
            }}
            fullWidth
            color="green"
          >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="green"
              className="ml-1 font-bold"
              onClick={loginModal}
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default ModalLogin;
