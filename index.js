import jsonfile from "jsonfile";
import moment from "moment";
import { simpleGit } from "simple-git";

const path = "./data.json";
const git = simpleGit();

async function createCommit(day) {
    const date = moment().subtract(day, "d").format();
    const data = { date };

    jsonfile.writeFile(path, data, async () => {
        await git.add(path);
        await git.commit(date, { '--date': date });
        await git.push();
        console.log(`Commit done for ${date}`);
    });
}

for (let day = 30; day >= 1; day--) {   // change 30 to any number of required past days
    createCommit(day);
}
