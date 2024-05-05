import {
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
  Checkbox,
  Textarea,
  DialogBody,
  Radio,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import useProfile from "../hooks/useProfile";

const ModalEditProfile = ({ showModal, closeModal }) => {
  const { formEdit, handleSubmit } = useProfile();
  console.log(formEdit);

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={showModal} handler={closeModal}>
        <DialogHeader>Edit Profile</DialogHeader>
        <DialogBody
          className="h-[42rem] overflow-y-scroll p-6 flex flex-col gap-4"
          style={{ maxHeight: "70vh" }}
        >
          <div className="w-40 mb-4">
            <img
              className="h-40 w-full rounded-lg object-cover object-center"
              src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              alt="nature image"
            />
          </div>

          <div className="mb-[-10px]">
            <label className="font-bold text-isPrimary mb-[-10px]">Name</label>
            <Input
              type="text"
              className="!border !border-isPrimary bg-white ring-4 ring-transparent placeholder:opacity-100 focus:!border-isPrimary focus:!border-t-isPrimary focus:ring-green-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[10px]" }}
              ref={(el) => (formEdit.current.name = el)}
            />
          </div>

          <div className="mb-[-10px]">
            <label className="font-bold text-isPrimary mb-[-10px]">
              Gender
            </label>

            <div className="flex">
              <div className="ms-[-10px]">
                <Radio
                  name="gender"
                  color="green"
                  label={
                    <Typography className="flex font-bold text-isPrimary">
                      Male
                    </Typography>
                  }
                ></Radio>
              </div>
              <div className="ms-4">
                <Radio
                  name="gender"
                  color="green"
                  label={
                    <Typography className="flex font-bold text-isPrimary">
                      Female
                    </Typography>
                  }
                ></Radio>
              </div>
            </div>
          </div>

          <div className="mb-[-10px]">
            <label className="font-bold text-isPrimary mb-[-10px]">
              Address
            </label>
            <Textarea
              className="!border !border-isPrimary bg-white  ring-4 ring-transparent placeholder:opacity-100 focus:!border-isPrimary focus:!border-t-isPrimary focus:ring-green-900/10"
              labelProps={{
                className: "sr-only",
              }}
            />
          </div>

          <div className="mb-[-10px]">
            <label
              className="font-bold mb-[-10px] border border-isPrimary block cursor-pointer text-center p-2 rounded-lg"
              htmlFor="image-edit"
            >
              <i className="fa-solid fa-plus text-isPrimary"></i>{" "}
              <span className="text-isPrimary">Upload Image</span>
            </label>
            <Input
              type="file"
              className="!border !border-isPrimary bg-white text-isPrimary ring-4 ring-transparent placeholder:opacity-100 focus:!border-isPrimary focus:!border-t-isPrimary focus:ring-green-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[10px]" }}
              hidden
              id="image-edit"
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray">
            cancel
          </Button>
          <Button variant="gradient" color="green" typeof="submit">
            Update
          </Button>
        </DialogFooter>
      </Dialog>
    </form>
  );
};

export default ModalEditProfile;
