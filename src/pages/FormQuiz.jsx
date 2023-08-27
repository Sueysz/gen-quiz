import * as Yup from 'yup';
import { Link } from "react-router-dom"
import { FormContent, FormContentContainer, FormPage } from "../components/style/FormPage"
import { useFormik } from "formik"
import { useState } from "react"
import { createQuiz } from "../api"
import { Btn, BtnCreate } from "../components/style/Buttons"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import PropTypes from 'prop-types'
import { Logo } from '../components/Logo';

export const FormQuiz = ({ categoriesList }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [quizData] = useState({
        title: "",
        color: "#000000",
        questions: [
            {
                question: "",
                answers: ["", "", ""],
                solution: 0,
            }
        ],
        category: ""
    });

    {/*utilisation de ma dépendance yup qui est un validateur de saisie.Ce schéma de validation garantit que 
    les données soumises dans le formulaire respectent certaines règles.*/}
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Le titre est requis"),
        color: Yup.string().required("La couleur est requise"),
        questions: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required("La question est requis"),
                answers: Yup.array()
                    .of(Yup.string().required("Les réponses sont requises"))
                    .min(3, "3 réponses minimum")
                    .max(3, "3 réponses maximum"),
                solution: Yup.number().required("La solution est requise").oneOf([0, 1, 2], "Invalid solution")
            })
        )
    });

    // Utilisation de useFormik pour gérer le formulaire
    const formik = useFormik({
        initialValues: quizData,
        validationSchema,
        onSubmit: async (values) => {
            // Mise à jour des solutions pour correspondre au format attendu par le serveur
            const updatedQuestions = values.questions.map(question => ({
                ...question,
                solution: question.solution
            }))

            console.log(values);
            try {
                // Appel à l'API pour créer le quiz
                const { quiz } = await createQuiz(
                    values.title,
                    values.color,
                    updatedQuestions,
                    values.category
                );
                console.log(quiz);
                navigate("/");
            } catch (error) {
                console.error("Erreur pendant la création du quiz:", error);
            }
        }
    })

    // Gestion des changements de question
    const handleQuestionChange = (event, index) => {
        const { value } = event.target;
        const updatedQuestions = [...formik.values.questions];
        updatedQuestions[index].question = value;
        formik.setFieldValue("questions", updatedQuestions);
    };

    // Gestion des changements de réponse
    const handleAnswerChange = (event, questionIndex, answerIndex) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        questions[questionIndex].answers[answerIndex] = value;
        formik.setFieldValue("questions", questions);
    }

    // Gestion des changements de solution
    const handleSolutionChange = (event, index) => {
        const { value } = event.target;
        const questions = [...formik.values.questions];
        questions[index].solution = parseInt(value);
        formik.setFieldValue("questions", questions);
    }

    // Ajout d'une nouvelle question
    const addQuestion = () => {
        const updatedQuestions = [...formik.values.questions];
        updatedQuestions.push({
            question: "",
            answers: ["", "", ""],
            solution: 0,
        });
        formik.setFieldValue("questions", updatedQuestions);
    }

    const placeholders = ["One", "Two", "Three"];

    if (!isLoggedIn) {
        // Rediriger ou afficher un message aux utilisateurs non connectés
        return (
            <div>
                <p>Veuillez vous connecter pour accéder à cette page.</p>
                <Link to="/logIn">Se connecter</Link>
            </div>
        );
    } else {
        return (
            // Affichage du formulaire 
            <FormPage>
                <header>
                    <Logo />
                </header>
                <h1>🎨Ajoute ton Quiz🎨</h1>
                <form onSubmit={formik.handleSubmit}>
                    <FormContentContainer>
                        <FormContent>
                            <h3 htmlFor="title">Titre</h3>
                            <input
                                id="title"
                                name="title"
                                value={formik.values.title}
                                placeholder='Mon quiz'
                                onChange={formik.handleChange}
                            />
                            {formik.errors.title && formik.touched.title && (
                                <div className="error-message">{formik.errors.title}</div>
                            )}
                        </FormContent>
                        <FormContent>
                            <h3 htmlFor="color">Couleur</h3>
                            <input
                                id="color"
                                type="color"
                                name="color"
                                style={{ width: '2.5rem' }}
                                value={formik.values.color}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.color && formik.touched.color && (
                                <div className="error-message">{formik.errors.color}</div>
                            )}
                        </FormContent>
                    </FormContentContainer>
                    <FormContentContainer>
                        <FormContent>
                            <h3 htmlFor="category">Categorie</h3>
                            <select
                                style={{ width: "20rem", height: "1.8rem" }}
                                id="category"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                            >
                                <option value="" disabled>
                                    Choisi une catégorie
                                </option>
                                {categoriesList.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.category && formik.touched.category && (
                                <div className="error-message">{formik.errors.category}</div>
                            )}
                        </FormContent>
                    </FormContentContainer>

                    {formik.values.questions.map((question, index) => (
                        <div key={index} className="question-container">
                            <FormContent>
                                <h3 htmlFor={`question-${index}`}>Question {index + 1}</h3>
                                <input
                                    id={`question-${index}`}
                                    name={`questions[${index}].question`}
                                    placeholder='Ma question'
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
                                <h3>Réponses</h3>
                                {question.answers.map((answer, answerIndex) => (
                                    <div key={answerIndex} className="answer-container">
                                        <div>
                                            <p>{answerIndex + 1}
                                                {/* Champ de saisie lié à Formik */}
                                                <input
                                                    type="text"
                                                    name={`questions[${index}].answers[${answerIndex}]`}
                                                    value={answer}
                                                    placeholder={placeholders[answerIndex]}
                                                    onChange={(event) =>
                                                        handleAnswerChange(event, index, answerIndex)
                                                    }
                                                />
                                            </p>
                                            {/* Vérification des erreurs liées aux réponses à l'aide de Formik */}
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
                                                    {/* Affichage du message d'erreur associé à cette réponse */}
                                                    {formik.errors.questions[index].answers[answerIndex]}
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </FormContent>

                            <FormContent>
                                <h3 htmlFor={`solution-${index}`}>Solution</h3>
                                <select
                                    name={`questions[${index}].solution`}
                                    value={formik.values.questions[index].solution}
                                    onChange={(event) => handleSolutionChange(event, index)}
                                >
                                    <option value="" disabled>
                                        Choisi une solution
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

                    <Btn type="button" onClick={addQuestion}>Ajouter une question</Btn>
                    <BtnCreate type="submit">Créer</BtnCreate>

                </form>
            </FormPage>
        );
    }
};


FormQuiz.propTypes = {
    categoriesList: PropTypes.array.isRequired, // Ou le type approprié pour votre cas
};