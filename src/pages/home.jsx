import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "../scss/home.scss";
import { Grid, Badge } from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// import { useHistory } from "react-router";
import { useHistory } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import Card from "../components/card.jsx";
import Popup from "../components/employeeForm/Popup";
import employeeService from "../services/employee";
import Notification from "../components/employeeForm/Notification";
import auth from "../services/auth";
import Login from "./login";
import { Dialog, DialogContent } from "@material-ui/core";
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  appBar: {
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-end",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    backgroundColor: "#f8f7f7",
    display: "flex",
    marginTop: 60,
    alignItems: "center",
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 20,
  },
  contentShift: {
    display: "flex",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 200,
  },
}));

/**
 * @description dashboard functional component with sideNavigation bar and Header
 * @return sideNavigation bar and Header
 */

export default function PersistentDrawerLeft() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [employeeIdEdit, setIdForEdit] = useState(null);
  const [addoredit, setOperation] = useState(null);
  var [employeeRecords, setEmployeeRecords] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "login successful",
    type: "success",
  });

  /**
   * @description handle drawerOpen, when its called sets setOPen variable to true
   */

  /**
   * @description handle Logout button, when its called- clears Local storage and pushes the page to Login
   */
  const handleLogin = () => {
    localStorage.removeItem("token");
    auth.logout(() => {
      history.push("/login");
    });
  };

  const handleAttendance = () => {
    setOpenPopup(true);
  };
  /**
   * @description handle Lisy button, when its fetches the Employee data from Backend
   * @returns SnakBar with success or failure message
   */
  const handleList = () => {
    employeeService
      .getAllEmployees()
      .then((res) => {
        if (res.data.success === true) {
          setEmployeeRecords((employeeRecords = res.data.EmployeeData));
        } else {
          setNotify({
            isOpen: true,
            message: "Something went wrong",
            type: "error",
          });
        }
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          message: "Something went wrong " + error.message,
          type: "error",
        });
      });
  };

  /**
   * @description handle addorEdit request button, when we want to add Employee data Edit
   * @param employeedata and resetForm are Passed
   * @returns SnakBar with success or failure message
   */
  const addOrEdit = (employee, resetForm) => {
    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "info",
    });
    if (addoredit === "add") {
      employeeService
        .insertEmployees(employee)
        .then((res) => {
          if (res.data.success === true) {
            setNotify({
              isOpen: true,
              message: res.data.message,
              type: "success",
            });
            handleList();
          } else {
            setNotify({
              isOpen: true,
              message: "Something went wrong",
              type: "error",
            });
          }
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong " + error.message,
            type: "error",
          });
        });
    } else {
      const employeeUpdateData = {
        _id: employeeIdEdit,
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
        company: employee.company,
        mobile: employee.mobile,
        designation: employee.designation,
        salary: employee.salary,
        city: employee.city,
      };

      employeeService
        .updateEmployee(employeeUpdateData)
        .then((res) => {
          if (res.data.success === true) {
            handleList();
            setNotify({
              isOpen: true,
              message: res.data.message,
              type: "success",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Something went wrong",
              type: "error",
            });
          }
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong " + error.message,
            type: "error",
          });
        });
    }
    resetForm();
    setOperation("add");
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  /**
   * @description handle Ondelete request button, when we want to Delete and Employee data
   * @param employeeId is passed to delete the Item
   * @returns SnakBar with success or failure message
   */
  const onDelete = (id) => {
    if (id) {
      employeeService
        .deleteEmployee(id)
        .then((res) => {
          if (res.data.success === true) {
            setNotify({
              isOpen: true,
              message: res.data.message,
              type: "success",
            });
            handleList();
          }
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: "Something went wrong " + error.message,
            type: "error",
          });
        });
    } else {
      setNotify({
        isOpen: true,
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  /**
   * @description handle OnEdit request from card
   * @param employee data to Edit is Passed
   */
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setIdForEdit(item._id);
    setOperation("edit");
    setOpenPopup(true);
  };

  return (
    <div className="">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx("Header", classes.appBar, {
          [classes.appBarShift]: open,
        })}
        data-testid="AppBar"
      >
        <Toolbar data-testid="Toolbar">
          <Typography variant="h7" className="heading" data-testid="Header">
            MKS FITNESS MEMBERS MANAGEMENT
          </Typography>
          <Grid container alignItems="center">
            <Grid item sm></Grid>
            <Grid item sm>
              <Button
                variant="contained"
                type="submit"
                onClick={handleAttendance}
                color="secondary"
                data-testid="MARK ATTENDANCE"
              >
                MARK ATTENDANCE
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                type="submit"
                onClick={handleLogin}
                color="primary"
                data-testid="logout"
              >
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {employeeRecords
            ? employeeRecords.map((employee) => {
                return (
                  <Card
                    id={employee._id}
                    employee={employee}
                    deleteItem={onDelete}
                    editItem={openInPopup}
                  />
                );
              })
            : null}
        </Grid>
      </main>
      <Popup
        data-testid="EmployeeForm"
        title="ATTENDANCE FORM"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        
      </Popup>
      <Notification
        data-testid="SnackBar"
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
}
