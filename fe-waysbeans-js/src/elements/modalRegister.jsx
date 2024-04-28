import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import useRegister from "../hooks/useRegister";

const Register = ({ showModal, closeModal, loginModal }) => {
  const { handleChanges, handleSubmit } = useRegister();

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
            REGISTER
          </Typography>
          <Input
            label="Name"
            size="lg"
            color="green"
            name="name"
            onChange={handleChanges}
          />
          <Input
            label="Email"
            size="lg"
            color="green"
            name="email"
            onChange={handleChanges}
          />
          <Input
            label="Password"
            size="lg"
            color="green"
            name="password"
            onChange={handleChanges}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            // onClick={closeModal}
            fullWidth
            color="green"
            onClick={() => {
              handleSubmit();
              closeModal();
            }}
          >
            REGISTER
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="green"
              className="ml-1 font-bold"
              onClick={loginModal}
            >
              Log in
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default Register;
