import { useNavigate } from "react-router";
import Card from "../../components/Card";
import DashboardStyles from "../../styles/Dashboard.module.css";

const Dashboard = () => {
    const projects = [
        {
            id: 1,
            title: "Expense Manager",
            description: "A simple expense tracking application built with React.",
            footer: "Created with React and CSS.",
            route: "/expense-tracker"
        },
        {
            id: 2,
            title: "Food Order App",
            description: "A simple food ordering application built with React.",
            footer: "Created with React and CSS.",
            route: "/food-order-app"
        },
        // {
        //     id: 3,
        //     title: "Practice",
        //     description: "A simple practice application built with React.",
        //     footer: "Created with React and CSS.",
        //     route: "/practice"
        // }
    ]
    const navigate = useNavigate();

    return (
        <div className={DashboardStyles.dashboard}>
            {projects.map((project) => (
                <Card
                    key={project.id}
                    title={project.title}
                    subtitle={project.description}
                    footer={project.footer}
                    onClick={() => navigate(project.route)}
                />
            ))}
        </div>
    )
}

export default Dashboard