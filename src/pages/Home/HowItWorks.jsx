import React from 'react';

const steps = [
    {
        title: 'Browse or Create Contests',
        description:
            'Explore a library of ongoing challenges or launch your own coding contest with custom rules and prizes.',
    },
    {
        title: 'Register and Submit',
        description:
            'Sign up for contests that match your skill level, work on the assigned tasks, and upload your solution before the deadline.',
    },
    {
        title: 'Compete & Collaborate',
        description:
            'View leaderboards in real time, get feedback from fellow participants, and learn from shared code snippets.',
    },
    {
        title: 'Win Rewards & Recognition',
        description:
            'Top performers earn cash prizes, badges and visibility – plus you can showcase your wins on your profile.',
    },
    {
        title: 'Build Your Coding Reputation',
        description:
            'Keep track of completed contests, ranking history and achievements; use your portfolio to attract collaborators or future employers.',
    },
];

const HowItWorks = () => {
    return (
        <section className="py-16" id="how-it-works">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-base-content mb-8">
                    How It Works
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-lg shadow hover:shadow-lg transition"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
