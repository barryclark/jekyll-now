

In this post, the paper *"Translating Videos to Natural Language Using Deep Recurrent Neural Networks"* is ivestigated and summarized.

*Venugopalan, Subhashini & Xu, Huijuan & Donahue, Jeff & Rohrbach, Marcus & Mooney, Raymond & Saenko, Kate. (2014). Translating Videos to Natural Language Using Deep Recurrent Neural Networks. 10.3115/v1/N15-1173.*


Summary:

In this paper, the main challenge is to translate videos directly to sentences using several neural network structures.

The authors reference some other papers in which similar works have been done. What makes this paper special is that different methodologies are used to be able to enhance the performance metrics. To give examples:
- (Barbu et al., 2012; Rohrbach et al., 2013) were succesful in a limited set of actions.

- (Guadarrama et al., 2013; Thomason et al., 2014) were succesful by simplifying an action to 'a fixed set of semantic roles i.e. subject, verb and object'.

But these kind of studies could not be generalized as they could not show the similar success in large datasets and these models lead strict sentence structures.

So the authors came with a new approach and used LSTM model to generate output descriptions from the inputs: *video features and previous word.* This approach is used because of the recent success of LSTM on machine translation tasks.

The structure of the whole system can be observed below in Figure 1.

!(Figure1)[./../images/paper4-1.png]

*The structure of the video description network*

To summarize the process in 5 steps:
    1. By using CNN, a fixed length visual data that summarizes the video is generated. (via Caffe framework)
    2. Then, the frames are sampled (10:1) and a vector of sized [1,4096] is generated to represent video.
    3. These vectors are fed to the LSTM Units to generate word outputs.
 
