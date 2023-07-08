import * as Yup from 'yup';
import { Link } from "react-router-dom"
import { FormContent, FormPage } from "../components/FormPage"
import { useState } from "react"
import { useFormik } from "formik"
import { StyledIcon } from "../components/Icons"
import { createQuiz } from "../api"
import { ConfirmButton } from "../components/Buttons"

export const FormQuiz = () => {
    const [quizData, setQuizData] = useState({
        title: "",
        color: "#000000",
        questions: [
            {
                question: "",
                answers: ["", "", ""],
                solution: 0,
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
                    .min(3, "Exactly 3 answers are required")
                    .max(3, "Exactly 3 answers are required"),
                solution: Yup.number().required("Solution is required").oneOf([0, 1, 2], "Invalid solution")
            })
        )
    });

    const formik = useFormik({
        initialValues: quizData,
        validationSchema,
        onSubmit: async (values) => {
            const updatedQuestions = values.questions.map(question => ({
                ...question,
                solution: question.solution - 1
            }))

            console.log(values);
            await createQuiz(values.title, values.color, updatedQuestions);
            setQuizData({
                title: "",
                color: "#000000",
                questions: [
                    {
                        question: "",
                        answers: ["", "", ""],
                        solution: 0,
                    }
                ]
            })
        }
    })

    const handleQuestionChange = (event, index) => {
        const { value } = event.target;
        const updatedQuestions = [...formik.values.questions];
        updatedQuestions[index].question = value;
        formik.setFieldValue("questions", updatedQuestions);
    };

    const handleAnswerChange = (event, questionIndex, answerIndex) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        questions[questionIndex].answers[answerIndex] = value;
        formik.setFieldValue("questions", questions);
    }

    const handleSolutionChange = (event, index) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        questions[index].solution = parseInt(value);
        formik.setFieldValue("questions", questions);
    }

    const addQuestion = () => {
        const updatedQuestions = [...formik.values.questions];
        updatedQuestions.push({
            question: "",
            answers: ["", "", ""],
            solution: 0,
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
                <FormContent>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.title && formik.touched.title && (
                        <div className="error-message">{formik.errors.title}</div>
                    )}
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
                </FormContent>

                {formik.values.questions.map((question, index) => (
                    <div key={index} className="question-container">
                        <FormContent>
                            <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
                            <textarea
                                id={`question-${index}`}
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
                        </FormContent>

                        <FormContent>
                            <label>Answers:</label>
                            {question.answers.map((answer, answerIndex) => (
                                <div key={answerIndex} className="answer-container">
                                    <div>
                                        <p>{answerIndex + 1} : <textarea
                                            type="text"
                                            name={`questions[${index}].answers[${answerIndex}]`}
                                            value={answer}
                                            onChange={(event) =>
                                                handleAnswerChange(event, index, answerIndex)
                                            }
                                        />
                                        </p>

                                    </div>
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
                        </FormContent>

                        <FormContent>
                            <label htmlFor={`solution-${index}`}>Solution:</label>
                            <select
                                name={`questions[${index}].solution`}
                                value={formik.values.questions[index].solution}
                                onChange={(event) => handleSolutionChange(event, index)}
                            >
                                <option value="" disabled>
                                    Select a solution
                                </option>
                                {new Array(3).fill(null).map((_, solution) => (
                                    <option key={solution} value={solution}>
                                        {solution + 1}
                                    </option>
                                ))}
                            </select>

                            {formik.errors.questions &&
                                formik.touched.questions &&
                                formik.errors.questions[index] &&
                                formik.touched.questions[index] &&
                                formik.errors.questions[index].solution &&
                                formik.touched.questions[index].solution && (
                                    <div className="error-message">{formik.errors.questions[index].solution}</div>
                                )}
                        </FormContent>
                    </div>
                ))}

                <button type="button" onClick={addQuestion}>Add a question</button>

                <ConfirmButton type="submit">Create</ConfirmButton>
            </form>
        </FormPage>
    );
};
