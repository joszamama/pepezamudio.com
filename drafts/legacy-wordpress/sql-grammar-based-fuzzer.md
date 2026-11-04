---
title: "Build your own SQL Grammar-based Fuzzer"
description: "This is an interactive exercise for the audience at the Fuzzing and Software Security Summer School at the National University of Singapore. For this project, you will build a grammar-based blackbox fuzzer to test SQLite"
date: "2024-05-21"
group: "projects"
legacyUrl: "https://jzamudio.com/sql-grammar-based-fuzzer/"
---

**This is an interactive exercise for the audience at the Fuzzing and Software Security Summer School at the National University of Singapore.**

For this project, you will build a **grammar-based blackbox fuzzer** to test SQLite, which is [the most widely deployed SQL database engine in the world.](https://www.sqlite.org/about.html) SQLite is implemented in C and for this project, you will work on Linux.

We provide you with a **Dockerfile** that sets up the project framework in a Ubuntu environment, including a GUI delivered to your web browser. This allows all students to work on the same platform, independently of their host setup (Linux, Windows, MacOS).

[Download materials here](/media/sql-grammar-based-fuzzer-Materials.zip)

Setting up the Docker Framework

Docker is one of the most popular containerisation software and has become one of the [most widely used industry standards](https://www.docker.com/blog/docker-index-shows-continued-massive-developer-adoption-and-activity-to-build-and-share-apps-with-docker/). In this project, Docker will serve to encapsulate all project dependencies as well as provide the same operational layer for all students. If you do not have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer, refer to the [get-started](https://www.docker.com/get-started/) guide Docker provides.

Once you have installed Docker, you can get started with your project following these steps:

1. **Build the Docker Image**:

First, you need to build the Docker image using the provided Dockerfile. Open your terminal and navigate to the directory containing the Dockerfile and the project1 folder. Use the following command to build the image:

```
docker build -t sectest .
```

- The `-t` flag allows you to specify a name (in this case, “sectest”) for the image.

2. **Run the Docker Container**:

Once the image is built, you can run the Docker container with the following command:

```
docker run -d --name sectest_container -v sectest:/app -p 6080:80 sectest
```

This command maps port 6080 on your host to port 80 inside the container and names the container “sectest\_container”, using the “sectest” image.

- The `-d` flag runs the container in detached mode, allowing you to use the terminal for other tasks.
- The `–name` flag sets up a name for the container.
- The `-v` flag creates and maps the volume named “sectest” on the host system to the directory “/app” inside the Docker container.

3. **Stop and restart the Docker Container**:

If you want to stop a running container without losing progress, use the docker stop command, specifying the container’s name or ID:

```
docker stop sectest_container
```

If you’ve stopped the container and want to restart it, use the docker start command. This command will ensure the same volume is executed, so you will not lose the progress you have made:

```
docker start sectest_container
```

4. **Extract files from the container to your local machine**:

If you want to extract a file from the container to the local machine, use the docker cp command, specifying the container’s name or ID, the path to the file to extract, and where you want to copy the file in your local system:

```
docker cp <containerId>:/file/path/within/container /host/path/target
```

Here’s an example on how to extract fuzzer.py at the folder /root/project1/ from the container sectest\_container and copying it to the folder the terminal directory is pointing at:

```
docker cp sectest_container:/root/project1/fuzzer.py .
```

5. **Accessing the GUI and Tools**:

After starting the Docker container, you can access the GUI (http://localhost:6080/) and various tools as follows:

- **Terminal**: Open a terminal within the Docker environment by navigating to “Start,” “System Tools,” and selecting “LXTerminal.”
- **File Explore**r: Open the file explorer by going to “Start”, “System Tools”, and selecting “File Manager PCManFM”
- **Web Browser**: Open your web browser by going to “Start,” “Internet,” and selecting either Mozilla Firefox or Google Chrome.

Fuzzing Framework

The fuzzing framework is stored at */root/project1*. The files in this directory are listed below. The files marked with **[C]** should be changed by you. The files marked with **[X]** must not be changed.

```
.
├── [C] fuzzer.py
├── [C] grammar.py
├── [X] Makefile
├── [X] run.py
├── [X] shell.c
├── [X] sqlite3
├── [X] sqlite3.c
├── [X] sqlite3ext.h
├── [X] sqlite3.h
├── [X] sqlite3-shell.gcno
└── [X] sqlite3-sqlite3.gcno
```

The main logic is implemented in **run.py**. This file **must not be changed**. To generate an input, **run.py** calls the function **fuzz\_one\_input** in **fuzzer.py**. **fuzzer.py** uses the grammar provided in **grammar.py**.

You can run **run.py** as follows to generate 1000 inputs, run them sequentially in SQLite, and do one final branch coverage measurement:

```
python3.10 run.py 1000
```

You can then find the coverage information in `coverage\_report.csv`. Also, there is a coverage plot generated in `plot.pdf`. With the current arguments, you will only see a constant line.

If you want to observe the coverage progression, use the following arguments:

```
python3.10 run.py --plot-every-x 100 1000
```

This will do a coverage measurement every 100 inputs and generate 1000 inputs in total. You can now observe the coverage progression in `plot.pdf`. Note that you first have to implement an interesting grammar to achieve non-constant coverage.

If you want to get a more detailed coverage report in `coverage\_report.html`, which might provide helpful insights to improve your grammar and implementation, use the following command after running *run.py*:

```
make coverage-html
```

**You may only change the grammar.py and fuzzer.py files.**

Project Tasks

There are two tasks in this project:

- Implement a diverse SQLite grammar in **grammar.py** which is able to generate all commands understood by SQLite. The grammar should be general: For instance, a `CREATE TABLE` command should be able to generate diverse table names. The page at https://www.sqlite.org/lang.html provides very detailed information about all commands of SQLite.
- Modify the function fuzz\_one\_input in **fuzzer.py**. The signature of this function must not be changed. The function should implement a grammar-based blackbox input generation for SQLite. You may add arbitrary code and functions in this file, but the entry point must be fuzz\_one\_input. Be creative in this task, and come up with ways to generate interesting inputs!

To get you started, find a grammar below that produces the `CREATE TABLE` command. Note that this grammar does not capture all details of the `CREATE TABLE` command.

```
grammar = {
    "<start>":            ["<create_table>"],
    "<create_table>":     ["CREATE TABLE <table_name> (<table_columns_def>);"],
    "<table_name>":       ["<string>"],
    "<table_columns_def>":["<table_column_def>",
                        "<table_columns_def>,<table_column_def>"],
    "<table_column_def>": ["<string> TEXT"],
    "<string>":           ["<letter>", "<letter><string>"],
    "<letter>":           ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", 
                        "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", 
                        "w", "x", "y", "z"]
}
```

How we evaluate your project

The most important dimension is *branch coverage*. To compute the branch coverage, we fuzz SQLite with 100.000 inputs generated by your fuzzer: *python3.10 run.py 100000*. Then we measure the *branch\_percent* coverage in *sqlite3.c*.

Tips to improve your project

After you run *python3.10 run.py 100000*, two files are generated:

- *plot.pdf*, shows the temporal branch coverage progression. This is only for your information and might help you to guide your implementation.
- *coverage-report.csv*, will be used by us to grade your project. We will focus only on the **branch coverage** in **sqlite3.c**.

If you run *make coverage-htm*l after running *run.py*, another file is generated:

- *coverage-report.html*, which provides a much more detailed coverage report, that allows you to investigate the code your fuzzer covered in detail and might help you to improve your implementation.

As a suggestion, you could generate just one input:

```
python3.10 run.py 1
```

Then produce a html coverage report:

```
make coverage-html
```

And check out which lines are not covered by this one input. Maybe you can tweak the grammar a little bit such that neighboring lines are covered. To find out which input your fuzzer generated, you might want to print the generated input in *fuzz\_one\_input*.

Notes

- Converting an extensive SQLite trace to a context-free grammar and using this as your grammar is not a valid solution. Your fuzzer should be able to come up with a large set of different combinations of SQL commands.
- Each fuzzing run starts with an empty database. However, the database persists during the execution.
- Fuzzing SQLite is difficult because **syntactically valid inputs may be rejected** when they are incompatible with the current database state. For instance, you can only delete a table if it was created before. Use this information in your implementation of *fuzz\_one\_input*.
- The start symbol of your grammar must be **<****start\****>**.

Evaluation Guidelines

**You should work individually on this project. Group work is not permitted.**

We will measure how much branch coverage your fuzzer achieves in **sqlite3.c**. During the evaluation, we will use your fuzzer for 5 minutes and measure the branch coverage achieved in SQLite.
