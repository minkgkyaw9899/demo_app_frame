# Essential Git Structure design

Let me explain how we're naming Branch name for a project and how we commit message semantically?

___

## Naming the branch name

We should create branch name by ticket no if our project is using a ticketing system like JIRA, GitHub issues or Backlog.

example

- `git checkout -b mkk/FPB-1`
- `git checkout -b FPB-2` especially for JARA

### Benefits

1. Clear association: By using ticket numbers as branch names, you establish a direct and clear association between the code changes and the corresponding tasks or issues. This makes it easier to understand the purpose and context of each branch, especially when looking at the commit history or reviewing code in the future.

2. Enhanced organization: Branches created with ticket numbers contribute to a more organized codebase. It becomes simpler to track and manage changes related to specific tickets, ensuring that tasks are properly scoped and isolated.

3. Improved collaboration: When multiple team members are working on different tickets concurrently, using ticket numbers in branch names facilitates collaboration. It enables team members to quickly identify the branches associated with specific tickets, making it easier to coordinate efforts, review code, and provide feedback.

4. Granular version control: Branches created by ticket numbers allow for granular version control. You can isolate changes related to a specific feature or bug fix, making it easier to revert or roll back changes if necessary, without affecting unrelated parts of the codebase.

5. Efficient bug tracking and resolution: By linking branches directly to tickets, it becomes straightforward to identify the code changes associated with a particular bug or issue. This helps in reproducing, analyzing, and resolving bugs more efficiently.

6. Documentation and reference: Using ticket numbers in branch names serves as documentation within the version control system. It helps in creating an audit trail of code changes and provides a reference point for future discussions or knowledge sharing.

Overall, creating branches based on ticket numbers improves traceability, collaboration, and organization within the development workflow. It enhances communication among team members and promotes efficient project management.

___

## Semantic Commit Messages For Developer

The Format of the commit message should be

```bash
<type>(<scope>): <subject> #this line is important
# must be blank
<body>
# must be blank
<footer>
```

`type` and `subject` are very important and we must add.

<br/>

example1—Shot commit

```bash
feat: Create splash screen
```

example2—Shot commit

```bash
git commit -m "refactor(useFetchPosts): Split component logic into hook"
```

<br/>

#### Allowed `<type>` values:

-[x] feat (new feature for the user, not a new feature for build script)
-[x] fix (bug fix for the user, not a fix to a build script)
-[x] docs (changes to the documentation)
-[x] style (formatting, missing semi colons, etc; no production code change)
-[x] refactor (refactoring production code, eg. renaming a variable)
-[x] test (adding missing tests, refactoring tests; no production code change)
-[x] chore (updating grunt tasks etc; no production code change)

The `<scope>` can be empty (e.g. if the change is a global or difficult to assign to a single component), in which case the parentheses are omitted. In smaller projects such as Karma plugins, the `<scope>` is empty.

<br/>

example3—Full commit

```bash
feat(user): Add user registration functionality

- Implement user registration form
- Validate user inputs
- Store user data in the database

Closes #123
```

example4—Full commit

```bash
git commit -m "fix(middleware): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Fixes #2310"
```

<br/>

#### `<Subject>`

Subject is required field and should describe a short note of your task.

#### `<Body>`

Body is optional and useful for describing detail lists of your task. Body should be written where your commit is a final commit.

### `<Footer>`

`<footer>` is the same as Body and can be useful when reminding about current issues or task/ticket no has been completed.

___

### Read More Detail and References

- [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)
- [https://seesparkbox.com/foundry/semantic_commit_messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [http://karma-runner.github.io/1.0/dev/git-commit-msg.html](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
