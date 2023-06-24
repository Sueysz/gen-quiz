import { Link } from "react-router-dom"
import { ConfirmButton } from "../components/Buttons"
import { FormPage } from "../components/FormPage"
import { StyledIcon } from "../components/Icons"
import { useState } from "react"
import { createQuiz } from "../api"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Filter from 'bad-words';

export const FormQuiz = () => {
    const [quizData, setQuizData] = useState({
        title: "",
        color: "#000000",
        questions: [
            {
                question: "",
                answers: ["", "", ""],
                solution: ""
            }
        ]
    });

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        color: Yup.string().required("Color is required"),
        questions: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required("Question is required"),
                answers: Yup.array()
                    .of(Yup.string().required("Answer is required"))
                    .min(1, "At least 1 answer is required")
                    .max(3, "Maximum of 3 answers allowed"),
                solution: Yup.string().required("Solution is required")
            })
        )
    });

    const formik = useFormik({
        initialValues: quizData,
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            await createQuiz(values.title, values.color, values.questions);
            setQuizData({
                title: "",
                color: "#000000",
                questions: [
                    {
                        question: "",
                        answers: ["", "", ""],
                        solution: "",
                    }
                ]
            })
        }
    })

    const handleQuestionChange = (event, index) => {
        const { value } = event.target;
        const updatedQuestions = [...formik.values.questions];
        const filter = new Filter();
        updatedQuestions[index].question = filter.clean(value);
        formik.setFieldValue("questions", updatedQuestions);
    };

    const handleAnswerChange = (event, questionIndex, answerIndex) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        const filter = new Filter();
        questions[questionIndex].answers[answerIndex] = filter.clean(value);
        formik.setFieldValue("questions", questions);
    }

    const handleSolutionChange = (event, index) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        const filter = new Filter();
        questions[index].solution = filter.clean(value);
        formik.setFieldValue("questions", questions);
    }

    const addQuestion = () => {
        const updatedQuestions = [...formik.values.questions];
        updatedQuestions.push({
            question: "",
            answers: ["", "", ""],
            solution: ""
        });
        formik.setFieldValue("questions", updatedQuestions);
    }

    return (
        <FormPage>
            <Link to="/">
                <StyledIcon src="/icons/logo.png" alt="logo" />
            </Link>
            <h1>🫣Add your Quiz🫣</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.title && formik.touched.title && (
                        <div className="error-message">{formik.errors.title}</div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input
                        id="color"
                        type="color"
                        name="color"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.color && formik.touched.color && (
                        <div className="error-message">{formik.errors.color}</div>
                    )}
                </div>

                {formik.values.questions.map((question, index) => (
                    <div key={index} className="question-container">
                        <div className="form-group">
                            <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
                            <textarea
                                id={`question-${index}`}
                                type="text"
                                name={`questions[${index}].question`}
                                cols="30"
                                rows="2"
                                value={question.question}
                                onChange={(event) => handleQuestionChange(event, index)}
                            />
                            {formik.errors.questions &&
                                formik.touched.questions &&
                                formik.errors.questions[index] &&
                                formik.touched.questions[index] && (
                                    <div className="error-message">{formik.errors.questions[index].question}</div>
                                )}
                        </div>

                        <div className="form-group">
                            <label>Answers:</label>
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="answer-container">
                                    <input
                                        type="text"
                                        name={`questions[${index}].answers[${answerIndex}]`}
                                        value={answer}
                                        onChange={(event) =>
                                            handleAnswerChange(event, index, answerIndex)
                                        }
                                    />
                                    {formik.errors.questions &&
                                        formik.touched.questions &&
                                        formik.errors.questions[index] &&
                                        formik.touched.questions[index] &&
                                        formik.errors.questions[index].answers &&
                                        formik.touched.questions[index].answers &&
                                        formik.errors.questions[index].answers[answerIndex] &&
                                        formik.touched.questions[index].answers[answerIndex] && (
                                            <div className="error-message">
                                                {formik.errors.questions[index].answers[answerIndex]}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <label htmlFor={`solution-${index}`}>Solution:</label>
                            <input
                                id={`solution-${index}`}
                                type="text"
                                name={`questions[${index}].solution`}
                                value={question.solution}
                                onChange={(event) => handleSolutionChange(event, index)}
                            />
                            {formik.errors.questions &&
                                formik.touched.questions &&
                                formik.errors.questions[index] &&
                                formik.touched.questions[index] &&
                                formik.errors.questions[index].solution &&
                                formik.touched.questions[index].solution && (
                                    <div className="error-message">{formik.errors.questions[index].solution}</div>
                                )}
                        </div>
                    </div>
                ))}
                
                <button type="button" onClick={addQuestion}>Add a question</button>

                <ConfirmButton type="submit">Create</ConfirmButton>
            </form>
        </FormPage>
    );
};
