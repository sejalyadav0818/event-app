import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../App.css";
import { useTranslation } from "react-i18next";
import { validationSchema,} from "../validationSchemas/eventSchema";

export const EventModal = ({
  isOpen,
  onClose,
  Formik,
  textarea,
  handletextareaChange,
  eventData,
  setEventData,
  selectedDay,
  currentDate,
}) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  const fullDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
  const existingEvent = eventData.find((event) => event.fullDate === fullDate);

  const handleFormSubmit = (values) => {
    const newEvent = { ...values, fullDate, description: textarea };

    const newEvents = existingEvent
      ? eventData.map((event) =>
          event.fullDate === fullDate ? newEvent : event
        )
      : [...eventData, newEvent];

    setEventData(newEvents);
    onClose();
  };

  const handleDelete = () => {
    const fullDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`; // format: YYYY-MM-DD
    const newEvents = eventData.filter((event) => event.fullDate !== fullDate);
    setEventData(newEvents);
    handletextareaChange({ target: { value: "" } });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-8 z-50">
      <div className="bg-white-200 p-12 rounded-md w-1/3">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">
            {existingEvent ? t("Edit Event") : t("Add Event")}
          </h1>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        </div>

        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
          initialValues={{
            eventname: existingEvent ? existingEvent.eventname : "",
            ffrom: existingEvent ? existingEvent.ffrom : "",
            to: existingEvent ? existingEvent.to : "",
            participants: existingEvent ? existingEvent.participants : "",
            textarea: existingEvent ? existingEvent.textarea : "",
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">
                      {t("Event Name")} :{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("Enter Event name")}
                      name="eventname"
                      onChange={handleChange}
                      value={values.eventname}
                      isValid={touched.eventname && !errors.eventname}
                      isInvalid={touched.eventname && !!errors.eventname}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="error-text"
                    >
                      {errors.eventname}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">
                      {t("From")} :{" "}
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="ffrom"
                      onChange={handleChange}
                      value={values.ffrom}
                      isValid={touched.ffrom && !errors.ffrom}
                      isInvalid={touched.ffrom && !!errors.ffrom}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="error-text"
                    >
                      {errors.ffrom}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">{t("TO")} : </Form.Label>
                    <Form.Control
                      type="date"
                      name="to"
                      onChange={handleChange}
                      value={values.to}
                      isValid={touched.to && !errors.to}
                      isInvalid={touched.to && !!errors.to}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="error-text"
                    >
                      {errors.to}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <label htmlFor="floatingTextarea">
                    {" "}
                    {t("Description (Optional)")}{" "}
                  </label>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder={t("Leave a Reminder here")}
                      id="floatingTextarea"
                      value={textarea}
                      onChange={handletextareaChange}
                    ></textarea>
                  </div>
                </Col>
                <Col>
                  <Form.Group className="mb-3 mt-10">
                    <Form.Label className="bold-text">
                      {t("Participants Name")} :{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("Enter Participants name")}
                      name="participants"
                      onChange={handleChange}
                      value={values.participants}
                      isValid={touched.participants && !errors.participants}
                      isInvalid={touched.participants && !!errors.participants}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="error-text"
                    >
                      {errors.participants}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <div className="flex justify-around items-center mb-1">
                  <button
                    class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    type="submit"
                  >
                    {existingEvent ? t("Edit") : t("Add")}
                  </button>
                  <button
                    class="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    onClick={handleDelete}
                  >
                    {t("Delete")}
                  </button>
                </div>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
