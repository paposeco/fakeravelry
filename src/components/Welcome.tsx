import Recap from "../images/recap.jpg";
import React, { useEffect } from "react";

const Welcome = function() {
    useEffect(() => {
        document.title = "Fake Ravelry: Home";
    }, []);
    return (
        <div id="blogcontent">
            <h2>Welcome to Fake Ravelry</h2>
            <div id="introduction">
                <p>
                    This website is a project for The Odin Project. It is meant to be a
                    copy of <a href="https://www.ravelry.com/">Ravelry</a>, a website for
                    crafters.
                </p>
                <p>
                    It is a very simplified version of Ravelry, with only two features
                    implemented: the user can add friends and projects. And that's it!
                </p>
                <p>Below is a copy of a blog post from Ravelry's main page.</p>
            </div>
            <div className="blogpost">
                <div className="blogpostheader">
                    <h2>2021 Recap</h2>
                    <div>
                        <p>
                            by{" "}
                            <a href="https://www.ravelry.com/people/onestitchshort">
                                onestitchshort
                            </a>
                        </p>
                        <p>January 7, 2022</p>
                    </div>
                </div>
                <img src={Recap} alt="2021recap" />

                <p>
                    After 2020, we had high hopes for 2021. In a lot of ways,
                    unfortunately, it didn't live up to our expectations. But through it
                    all, Ravelers kept on making beautiful creations! This year our
                    Ravelry community:
                </p>
                <ul>
                    <li>
                        published more than <b>82,000</b> patterns, helping the Ravelry
                        database grow past <b>1.1 million</b> patterns
                    </li>
                    <li>
                        finished over <b>1.2 million</b> projects: 1,000,000 knitting,
                        192,000 crochet, 7,000 weaving, 6,000 machine knitting, 1,000 loom
                        knitting, and 14,000 spinning projects.
                    </li>
                    <li>
                        used at least <b>440 million yards</b> /{" "}
                        <b>400 million meters of yarn</b>
                    </li>
                    <li>
                        added over <b>31.7 million</b> patterns and 3 million projects to
                        your favorites
                    </li>
                    <li>
                        spun over <b>1200 kilograms</b> of fiber
                    </li>
                    <li>
                        added over 9 million photos throughout pattern, yarn, project, and
                        stash pages
                    </li>
                    <li>
                        kept our Hot Right Now area busy! <b>6,230</b> different patterns
                        were featured in the Hot Right Now top 20. <b>4,135</b> designers
                        appeared in the debut patterns spotlight. You can find both of these
                        lists on the Patterns page.
                    </li>
                </ul>
                <p>
                    Last year, we posted the number of projects countries had completed
                    per capita and it sparked a little friendly competition between
                    countries who wanted to move up in the rankings. Here's our Top 5 2021
                    countries based on projects per capita:
                </p>
                <ul>
                    <li>Iceland: 744 projects per 100,000 people</li>
                    <li>Norway: 601 projects per 100,000 people</li>
                    <li>Finland: 544 projects per 100,000 people</li>
                    <li>Canada: 302 projects per 100,000 people</li>
                    <li>Sweden: 285 projects per 100,000 people</li>
                </ul>
                <p>
                    While Iceland, Norway, and Finland remained our top three in that
                    order, Finland moved much closer to Norway.Last year they were
                    separated by 167 projects and this year only 67 projects separated
                    them!
                </p>

                <p>
                    Your creativity has kept us inspired throughout 2021 and we are very
                    much looking forward to seeing what you will make in 2022. If you'd
                    like to set a goal for how many projects you'd like to create, check
                    out our Project Challenge! It allows you to set your goal and make a
                    plan for 2022 using your queue.You can find out how it works in this
                    blog post.
                </p>

                <p>
                    We know the year hasn't quite started on a hopeful note with high
                    Covid rates in many parts of the world, but your creations bring joy
                    both to those around you and to those of us who get the pleasure of
                    seeing them on Ravelry. Here's to more creativity and joy flying off
                    the needles and hooks in 2022!
                </p>
            </div>
        </div>
    );
};

export default Welcome;
