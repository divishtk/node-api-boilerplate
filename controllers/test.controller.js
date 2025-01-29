
export const testPostContoller = async (req, res) => {
    const {testName} = req.body;
    res.status(200).json({message: `Test name is ${testName}`});
}

