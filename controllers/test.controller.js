
export const testPostContoller = async (req, res) => {
    console.log(req.body);
    const {testName} = req.body;
    res.status(200).json({message: `Test name is ${testName}`});
}

