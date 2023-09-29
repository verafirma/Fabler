# Fabler
Fabler is a public-domain [Z-machine](https://en.wikipedia.org/wiki/Z-machine) implementation written in Typescript.

# Current state
THIS CODE ISNT READY YET.  DONT FORK IT, DONT READ IT, DONT USE IT

# Authorship
This code is heavily (like, **REALLY** heavily.  Like, they did all the hard parts and I just messed around with 
adding typing) taken from https://github.com/DLehenbauer/jszm , which itself is taken from the 
[jszm v2.0.2](http://zzo38computer.org/jszm/jszm.js) by zzo38.  While no official license statement is 
in the original source, it does state the it is in the "public domain", which for these purposes I am treating
as **at least as open as the MIT licence**.  If it turns out I am wrong about this, and you are one of the upstream
authors, please contact me and we'll get it resolved immediately.

While jszm relies heavily on generators, for the most part I have switched things over to classes and promises.  To
a certain extent, this is just a matter of taste - generators essentially allow you to memoize the state of a 
stream within the function.  Since I'm wrapping the whole thing up in a class that itself can have state (and share
it between the various implementation functions) the generator paradigm does less for me... And I really wanted 
to make the various functions async so that I could do some more interesting things with them.  If you are
someone who really likes generators it's not THAT hard to switch them back - I may end up writing an adapter
class one of these days.